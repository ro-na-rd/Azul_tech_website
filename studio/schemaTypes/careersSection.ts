import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'careersSection',
  title: 'Careers Section',
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
      initialValue: 'CAREERS',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'richHeading',
      description: 'Supports Gradient decorator',
    }),
    defineField({
      name: 'slides',
      title: 'Career Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: { select: { title: 'title', subtitle: 'label', media: 'image' } },
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'Small label above title (e.g. "Kigali Tech Hub")' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'link', title: 'Link URL', type: 'string' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
  ],
})
