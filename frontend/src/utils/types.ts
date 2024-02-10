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

export interface Story {
  created_date: string;
  end_game: boolean;
  is_multi_player: boolean;
  players: any[]; // You might want to replace `any[]` with a more specific type if you know the structure of the `players` array.
  title: string;
  __v: number;
  _id: string;
  topic: string;
}