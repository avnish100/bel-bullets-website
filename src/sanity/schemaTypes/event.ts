import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  type: 'document',
  title: 'Event',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image'
    },
    {
      name: 'mobileImage',
      type: 'image',
      title: 'Mobile Image'
    },
    {
      name: 'objectfit',
      type: 'string',
      title: 'Object Fit'
    },
    {
      name: 'signUpLink',
      type: 'url',
      title: 'Sign Up Link'
    },
    {
      name: 'date',
      type: 'string',
      title: 'Date'
    },
    {
      name: 'time',
      type: 'string',
      title: 'Time'
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location'
    },
    {
      name: 'isSponsor',
      type: 'boolean',
      title: 'Is Sponsor'
    }
  ]
})
