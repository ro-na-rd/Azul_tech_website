import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footerSection',
  title: 'Footer Section',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      description: 'Optional custom logo for the footer. Falls back to default if not provided.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description below the logo',
    }),
    defineField({
      name: 'navGroups',
      title: 'Navigation Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Group Title', type: 'string'}),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'label', title: 'Label', type: 'string'}),
                    defineField({name: 'url', title: 'URL', type: 'string'}),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'string'}),
        defineField({name: 'twitter', title: 'Twitter URL', type: 'string'}),
        defineField({name: 'github', title: 'GitHub URL', type: 'string'}),
      ],
    }),
    defineField({
      name: 'bottomLinks',
      title: 'Bottom Bar Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'string'}),
          ],
        },
      ],
    }),
  ],
})
