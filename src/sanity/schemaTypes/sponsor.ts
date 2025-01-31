import {defineField, defineType} from 'sanity'

export const sponsor = defineType({
  name: 'sponsor',
  type: 'document',
  title: 'Sponsor',
  fields: [
    {
    name: 'name',
    type: 'string',
    title: 'Name'
  },
  {
    name: 'logo',
    type: 'image',
    title: 'Logo'
  },
  {
    name: 'url',
    type: 'url',
    title: 'URL'
  },
  {
    name: 'description',
    type: 'text',
    title: 'Description'
  },
  {
    name: 'color',
    type: 'string',
    title: 'Color'
  }
]
})
