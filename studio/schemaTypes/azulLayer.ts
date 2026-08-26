import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'azulLayer',
  title: 'Azul Stack Layer',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Layer Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
