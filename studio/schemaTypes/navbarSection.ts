import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navbarSection',
  title: 'Navbar Section',
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
      title: 'Navbar Logo',
      type: 'image',
      description: 'Optional custom logo for the navbar. Falls back to default if not provided.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'href', title: 'Link (e.g. #layers or /about)', type: 'string'}),
          ],
        },
      ],
      initialValue: [
        { label: "Architecture", href: "#layers" },
        { label: "Work", href: "#work" },
        { label: "Approach", href: "#approach" },
        { label: "Contact", href: "#contact" },
      ],
    }),
  ],
})
