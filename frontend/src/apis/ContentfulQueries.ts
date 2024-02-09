export const ContentfulMediaTranslationsQuery =
  /* GraphQL */
  `
    query ($locale: String!) {
      translationsCollection(locale: $locale) {
        total
        items {
          key
          value
        }
      }
    }
  `;

