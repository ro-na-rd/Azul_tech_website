import { createClient } from '@sanity/client';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 's44ol3h7';
const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
const API_VERSION = '2024-04-28';

// Read-only client using Sanity CDN for fast edge-cached responses
export const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true,
  apiVersion: API_VERSION,
});

// Write client (mutations, contact submissions, newsletter subscriptions)
const writeClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false,
  apiVersion: API_VERSION,
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
});

export const subscribeToNewsletter = async (email: string) => {
  return await writeClient.create({
    _type: 'subscriber',
    email,
    subscribedAt: new Date().toISOString(),
  });
};

export const submitContactMessage = async (data: {
  fullName: string;
  email: string;
  service: string;
  message: string;
}) => {
  return await writeClient.create({ _type: 'contactMessage', ...data });
};

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

/** Returns an optimized Sanity image URL with sensible defaults. */
export function optimizedUrl(
  source: any,
  opts: { width?: number; quality?: number } = {}
): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  try {
    return builder
      .image(source)
      .width(opts.width ?? 1200)
      .quality(opts.quality ?? 80)
      .auto('format')
      .url();
  } catch {
    return '';
  }
}

export const getHeroData = async (lang: string = 'en') => {
  return await sanityClient.fetch(
    groq`*[_type == "hero" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
      title,
      subtitle,
      ctaText,
      ctaLink,
      bentoCards[]{
        type,
        title,
        image,
        link,
        isTall,
        tag,
        date
      },
      interviewCard{
        category,
        series,
        title,
        image,
        mediaType,
        videoUrl,
        videoFile {
          asset->{
            url
          }
        }
      }
    }`,
    { lang }
  );
};

export const getHomePageData = async (lang: string = 'en') => {
  return await sanityClient.fetch(
    groq`{
      "layers": *[_type == "layersSection" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
        layersLabel,
        layersHeading,
        layersDescription,
        layers[]{
          title,
          description,
          image
        }
      },
      "discussions": *[_type == "discussionsSection" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
        discussionsLabel,
        discussionsTitle,
        discussionsSubtitle,
        discussions[]{
          title,
          description,
          category,
          mediaType,
          image,
          duration,
          link,
          videoUrl,
          videoFile {
            asset->{
              url
            }
          },
          isFeatured
        }
      },
      "sovereign": *[_type == "sovereignSection" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
        label,
        heading,
        description,
        conventionalTitle,
        conventionalFeatures,
        approachTitle,
        approachFeatures,
        stats[]{label, value, suffix, icon},
        partnersLabel,
        partnersDescription,
        partners,
        ctaText,
        ctaLink
      },
      "approach": *[_type == "approachSection" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
        label,
        heading,
        items[]{
          title,
          description,
          image
        }
      },
      "careers": *[_type == "careersSection" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
        label,
        heading,
        slides[]{
          title,
          label,
          description,
          link,
          image
        }
      },
      "contact": *[_type == "contactSection" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
        label,
        heading,
        description,
        emails,
        phones,
        locations[]{
          name,
          address
        },
        services
      },
      "footer": *[_type == "footerSection" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
        logo,
        description,
        navGroups[]{
          title,
          links[]{label, url}
        },
        socials{linkedin, twitter, github},
        bottomLinks[]{label, url}
      },
      "navbar": *[_type == "navbarSection" && (language == $lang || !defined(language) || language == null)] | order(select(language == $lang => 0, 1) asc, _updatedAt desc)[0]{
        logo,
        navItems[]{label, href}
      }
    }`,
    { lang }
  );
};
