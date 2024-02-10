export type ResolvedLanguage = "en" | "de";

export enum Language {
  "de" = "de",
  "en" = "en-US",
  "en-GB" = "en-US"
}


export interface ContentfulMediaTranslations {
  key: string;
  value: string;
  description: any;
}

export interface ContentfulMediaTranslationsQueryResult {
  translationsCollection: {
    items: ContentfulMediaTranslations[];
  };
}

export interface ContentfulMediaTranslationsQueryVariables {
  locale: Language;
}

export interface IOutletContext {
  lng?: string;
}
