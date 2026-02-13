import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  ogImage?: string;
}

const SITE_NAME = "Funding Clarity";
const BASE_URL = "https://fundingclarity.co.uk";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.png`;

/**
 * Sets document <title>, meta description, OpenGraph, and Twitter Card tags
 * for the current page. Cleans up on unmount.
 */
export function useSEO({ title, description, path, ogType = "website", ogImage }: SEOProps) {
  useEffect(() => {
    const fullTitle = path === "/" ? `${SITE_NAME} — Stop Guessing. Start Getting Funded.` : `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    const tags: Record<string, string> = {
      description,
      // OpenGraph
      "og:title": fullTitle,
      "og:description": description,
      "og:type": ogType,
      "og:url": `${BASE_URL}${path}`,
      "og:image": ogImage || DEFAULT_OG_IMAGE,
      "og:site_name": SITE_NAME,
      "og:locale": "en_GB",
      // Twitter Card
      "twitter:card": "summary_large_image",
      "twitter:title": fullTitle,
      "twitter:description": description,
      "twitter:image": ogImage || DEFAULT_OG_IMAGE,
    };

    const createdElements: HTMLMetaElement[] = [];

    Object.entries(tags).forEach(([key, value]) => {
      const isOg = key.startsWith("og:");
      const isTwitter = key.startsWith("twitter:");
      const attrName = isOg || isTwitter ? "property" : "name";

      let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, key);
        document.head.appendChild(el);
        createdElements.push(el);
      }
      el.setAttribute("content", value);
    });

    return () => {
      createdElements.forEach((el) => el.remove());
    };
  }, [title, description, path, ogType, ogImage]);
}
