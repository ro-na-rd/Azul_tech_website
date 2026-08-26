import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'richHeading',
      description: 'The big bold text at the top (Supports Gradient decorator)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'The description text below the title',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
    defineField({
      name: 'bentoCards',
      title: 'Bento Grid Cards',
      type: 'array',
      of: [{type: 'bentoCard'}],
    }),
    defineField({
      name: 'interviewCard',
      title: 'Featured Interview Card',
      type: 'interviewCard',
    }),
  ],
})
