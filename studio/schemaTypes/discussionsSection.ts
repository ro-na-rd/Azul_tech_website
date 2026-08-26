import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'discussionsSection',
  title: 'Discussions Section',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'discussionsLabel',
      title: 'Section Label (e.g. ARCHIVE)',
      type: 'string',
      initialValue: 'ARCHIVE',
    }),
    defineField({
      name: 'discussionsTitle',
      title: 'Section Title',
      type: 'richHeading',
      description: 'Supports Gradient decorator',
    }),
    defineField({
      name: 'discussionsSubtitle',
      title: 'Section Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'discussions',
      title: 'Sovereign Discussions List',
      type: 'array',
      of: [{type: 'discussion'}],
    }),
  ],
})
