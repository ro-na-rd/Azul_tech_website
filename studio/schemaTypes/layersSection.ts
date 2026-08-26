import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'layersSection',
  title: 'Layers Section',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'layersLabel',
      title: 'Section Label (e.g. THE AZUL STACK)',
      type: 'string',
      initialValue: 'THE AZUL STACK',
    }),
    defineField({
      name: 'layersHeading',
      title: 'Section Heading',
      type: 'richHeading',
    }),
    defineField({
      name: 'layersDescription',
      title: 'Section Description',
      type: 'text',
    }),
    defineField({
      name: 'layers',
      title: 'Azul Stack Layers',
      type: 'array',
      of: [{type: 'azulLayer'}],
    }),
  ],
})
