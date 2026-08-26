import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'approachSection',
  title: 'Approach Section',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'OUR APPROACH',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'richHeading',
      description: 'Supports Gradient decorator',
    }),
    defineField({
      name: 'items',
      title: 'Approach Items',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: { title: 'title' },
          },
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
  ],
})
