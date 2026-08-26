import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'Azul Tech',

  projectId: 's44ol3h7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: structure
    }), 
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'fr', title: 'French'}
      ],
      schemaTypes: [
        'hero',
        'layersSection',
        'discussionsSection',
        'sovereignSection',
        'approachSection',
        'careersSection',
        'contactSection',
        'footerSection',
        'navbarSection'
      ],
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
