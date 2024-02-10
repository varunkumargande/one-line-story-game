export const ContentfulMediaTranslationsQuery =
  /* GraphQL */
  `
    query ($locale: String!) {
      translationsCollection(locale: $locale, where:{contentfulMetadata:{tags:{id_contains_all:"oneLineStoryGame"}}}) {
        total
        items {
          key
          value
          description {
            json
          }
        }
      }
    }
  `;

