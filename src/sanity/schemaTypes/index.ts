import { type SchemaTypeDefinition } from 'sanity'
import {run} from '@/sanity/schemaTypes/run'
import {event} from '@/sanity/schemaTypes/event'
import { sponsor } from '@/sanity/schemaTypes/sponsor'
import { post } from '@/sanity/schemaTypes/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [run, event,sponsor,post],
}
