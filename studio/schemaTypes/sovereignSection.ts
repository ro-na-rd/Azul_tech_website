import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sovereignSection',
  title: 'Sovereign Section',
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
      initialValue: 'Sovereign by Design',
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
    
    // Comparison Section
    defineField({
      name: 'conventionalTitle',
      title: 'Conventional Title',
      type: 'string',
      initialValue: '"Does the system work?"',
    }),
    defineField({
      name: 'conventionalFeatures',
      title: 'Conventional Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'approachTitle',
      title: 'Our Approach Title',
      type: 'string',
      initialValue: '"Can another team build on this specification?"',
    }),
    defineField({
      name: 'approachFeatures',
      title: 'Our Approach Features',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // Stats Section
    defineField({
      name: 'stats',
      title: 'Stats Row',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'value', type: 'string'},
            {name: 'suffix', type: 'string'},
            {
              name: 'icon', 
              type: 'string', 
              description: 'Icon name (Shield, Network, TrendingUp, FileCheck)',
              options: {
                list: ['Shield', 'Network', 'TrendingUp', 'FileCheck']
              }
            },
          ]
        }
      ]
    }),

    // Partners Section
    defineField({
      name: 'partnersLabel',
      title: 'Partners Label',
      type: 'string',
      initialValue: 'TRUSTED BY NATIONS',
    }),
    defineField({
      name: 'partnersDescription',
      title: 'Partners Description',
      type: 'text',
    }),
    defineField({
      name: 'partners',
      title: 'Partner Names',
      type: 'array',
      of: [{type: 'string'}],
    }),
    
    // CTA
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Start the conversation',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
  ],
})
