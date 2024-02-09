import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ContentfulMediaTranslationsQuery } from "apis/ContentfulQueries";
import {
  type ContentfulMediaTranslationsQueryResult,
  Language,
  type ResolvedLanguage,
  type ContentfulMediaTranslationsQueryVariables,
  type ContentfulMediaTranslations,
} from "utils/types";
import { useTranslation } from "react-i18next";

export const useContentfulMediaTranslations = () => {
  const { i18n } = useTranslation();
  const lng = i18n.language as ResolvedLanguage;
  const [t, setTranslations] = useState<
    Record<string, ContentfulMediaTranslations>
  >({});

  const { data } = useQuery<
    ContentfulMediaTranslationsQueryResult,
    ContentfulMediaTranslationsQueryVariables
  >(
    gql`
      ${ContentfulMediaTranslationsQuery}
    `,
    {
      variables: { locale: Language[lng] },
    }
  );

  useEffect(() => {
    const datam: Record<string, ContentfulMediaTranslations> = {};
    data?.translationsCollection?.items.map((item) => {
      return (datam[item.key] = item);
    });
    setTranslations(datam);
  }, [data, lng]);

  return {
    t,
  };
};
