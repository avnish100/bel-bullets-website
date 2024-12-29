import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { StravaSyncService } from '@/services/strava-sync'
import pLimit from 'p-limit'

// Constants
const BATCH_SIZE = 20
const STRAVA_RATE_LIMIT = 100

// Initialize rate limiter
const limit = pLimit(STRAVA_RATE_LIMIT)

// Initialize Supabase admin client for cron job
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function processProfile(userId: string, syncService: StravaSyncService) {
  try {
    console.log(`Starting sync for user ${userId}`)
    await syncService.syncActivities(userId)
    console.log(`Completed sync for user ${userId}`)
  } catch (error: any) {
    console.error(`Error processing user ${userId}:`, error)
    await logSyncError(userId, error.message)
    throw error // Re-throw to be caught by Promise.allSettled
  }
}

async function logSyncError(userId: string, errorMessage: string) {
  await supabaseAdmin
    .from('sync_errors')
    .insert({
      user_id: userId,
      error_message: errorMessage,
      occurred_at: new Date().toISOString()
    })
}

async function logSyncSummary(summary: {
  total_profiles: number
  successful_syncs: number
  failed_syncs: number
  sync_time: string
}) {
  await supabaseAdmin
    .from('sync_summaries')
    .insert(summary)
}

export async function POST(req: NextRequest) {
  
  try {
    //Get profiles that need syncing
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id, last_sync_time')
      .not('strava_refresh_token', 'is', null)
      .or(
        `last_sync_time.is.null,` +
        `last_sync_time.lt.${new Date(Date.now() - 15 * 60 * 1000).toISOString()}`+
        `last_sync_status.eq.failed`
      )
      .order('last_sync_time', { ascending: true, nullsFirst: true })
      .limit(100)


    if (profilesError) {
      throw new Error(`Error fetching profiles: ${profilesError.message}`)
    }

    console.log(`Processing ${profiles.length} profiles`)

    // Create a single StravaSyncService instance
    const stravaSyncService = new StravaSyncService()

    // Process profiles in batches
    const results: PromiseSettledResult<any>[] = []
    for (let i = 0; i < profiles.length; i += BATCH_SIZE) {
      const batch = profiles.slice(i, i + BATCH_SIZE)
      const batchResults = await Promise.allSettled(
        batch.map(profile =>
          limit(() => processProfile(profile.id, stravaSyncService))
        )
      )
      results.push(...batchResults)
    }

    // Analyze results
    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length

    // Log sync summary
    await logSyncSummary({
      total_profiles: profiles.length,
      successful_syncs: successful,
      failed_syncs: failed,
      sync_time: new Date().toISOString()
    })

    return NextResponse.json({
      message: 'Sync completed',
      summary: {
        total: profiles.length,
        successful,
        failed
      }
    })

  } catch (error: any) {
    console.error('Cron job error:', error)
    await logSyncError('CRON_GENERAL', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
