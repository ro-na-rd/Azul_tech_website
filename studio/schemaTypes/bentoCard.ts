import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bentoCard',
  title: 'Bento Card',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Card Type (e.g. Implementation, Health Protocol)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'string',
    }),
    defineField({
      name: 'isTall',
      title: 'Tall Layout?',
      type: 'boolean',
      description: 'Check this if the card should be tall (480px) instead of short (320px)',
      initialValue: false,
    }),
    defineField({
      name: 'tag',
      title: 'Tag (e.g. LIVE, NEW)',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date (e.g. Oct 2023)',
      type: 'string',
    }),
  ],
})
