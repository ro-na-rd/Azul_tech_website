import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'richHeading',
  title: 'Rich Heading',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Heading Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [], 
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              {
                title: 'Gradient',
                value: 'gradient',
                icon: () => 'G',
              },
            ],
          },
        }),
      ],
    }),
  ],
})
