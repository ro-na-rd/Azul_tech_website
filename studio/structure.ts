import type {StructureResolver} from 'sanity/structure'

const LANGUAGES = [
  {id: 'en', title: 'English'},
  {id: 'fr', title: 'French'},
]

const SINGLETONS = [
  {id: 'navbarSection', type: 'navbarSection', title: 'Navbar Section'},
  {id: 'hero', type: 'hero', title: 'Hero Section'},
  {id: 'layersSection', type: 'layersSection', title: 'Layers Section'},
  {id: 'discussionsSection', type: 'discussionsSection', title: 'Discussions Section'},
  {id: 'sovereignSection', type: 'sovereignSection', title: 'Sovereign Section'},
  {id: 'approachSection', type: 'approachSection', title: 'Approach Section'},
  {id: 'careersSection', type: 'careersSection', title: 'Careers Section'},
  {id: 'contactSection', type: 'contactSection', title: 'Contact Section'},
  {id: 'footerSection', type: 'footerSection', title: 'Footer Section'},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .id(singleton.id)
          .child(
            S.list()
              .title(`${singleton.title} Languages`)
              .items(
                LANGUAGES.map((lang) =>
                  S.documentListItem()
                    .id(`${singleton.id}-${lang.id}`)
                    .schemaType(singleton.type)
                    .title(`${singleton.title} (${lang.title})`)
                )
              )
          )
      ),

      S.divider(),

      // Filter out singletons from the generic list
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.map((s) => s.type).includes(listItem.getId() || '')
      ),
    ])
