import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
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
      initialValue: 'GET IN TOUCH',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'richHeading',
      description: 'Supports Gradient decorator',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
    }),
    defineField({
      name: 'emails',
      title: 'Email Addresses',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['hello@azultech.rw'],
    }),
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['+250 791 956 617'],
    }),
    defineField({
      name: 'locations',
      title: 'Headquarters/Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Location Name (e.g. Headquarters)', type: 'string'},
            {name: 'address', title: 'Address', type: 'text'},
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services (for dropdown)',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [
        'Identity Infrastructure',
        'Payment Rails',
        'Data Sovereignty',
        'Custom Architecture',
      ],
    }),
  ],
})
