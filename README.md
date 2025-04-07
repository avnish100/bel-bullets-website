# Bel Bullets Website

A Next.js-based web application for the Bel Bullets running club that integrates with Strava to track member activities and maintain leaderboards.

## Features

- Strava Integration for activity tracking
- User authentication with Supabase
- Leaderboard system for running activities
- Club member dashboard
- Event management
- Community features
- Close to Real-time activity sync
- Automated rank notifications

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **API Integration**: Strava API
- **Email**: Resend

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Supabase account
- A Strava API application
- A Resend account (for emails)
- A Sanity.io account

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd bel-bullets-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory. I will provide you with the necessary values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   NEXT_PUBLIC_STRAVA_CLIENT_ID=
   STRAVA_CLIENT_SECRET=
   NEXT_PUBLIC_BASE_URL=
   RESEND_API_KEY=
   NEXT_PUBLIC_SANITY_PROJECT_ID=
   NEXT_PUBLIC_SANITY_DATASET=
   SANITY_API_TOKEN=
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - Reusable React components
- `/src/lib` - Core utilities and configurations
- `/src/services` - Service layer for strava sync
- `/src/utils` - Helper functions and utilities
- `/src/types` - TypeScript type definitions
- `/public` - Static assets
- `/sanity` - Sanity.io CMS configuration and schemas

## Database Schema

The application uses Supabase with the following main tables:
- `profiles` - User profiles with Strava integration data
- `club_members` - Club membership information
- `activities` - Synced Strava activities
- `sync_summaries` - Activity sync logs
- `sync_errors` - Error logging for activity syncs

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Development Guidelines

- Follow TypeScript best practices
- Use the existing shadcn components as much as possible.
- Write meaningful commit messages, see [Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
- Keep the code clean and well-documented

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `/api/cron` - To test the cron job

## Support

For any additional help feel free to contact me at avnishjha1005@gmail.com
