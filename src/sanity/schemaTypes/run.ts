import {defineField, defineType} from 'sanity'

export const run = defineType({
  name: 'run',
  type: 'document',
  title: 'Run',
  fields: [
    {
      name: 'type',
      type: 'string',
      title: 'Type'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'when',
      type: 'string',
      title: 'When'
    },
    {
      name: 'date',
      type: 'string',
      title: 'Date'
    },
    {
      name: 'distance',
      type: 'string',
      title: 'Distance'
    },
    {
      name: 'pace',
      type: 'string',
      title: 'Pace'
    },
    {
      name: 'formLink',
      type: 'url',
      title: 'Form Link'
    }
  ]
})
