import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "headline": z.string(),
        "headlineAccent": z.string(),
        "subheadline": z.string(),
        "ctaPrimary": z.string(),
        "ctaSecondary": z.string(),
        "stats": z.array(z.object({
          "id": z.string(),
          "value": z.string(),
          "label": z.string()
        }))
      }),
      "services": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "outcome": z.string(),
          "size": z.string()
        }))
      }),
      "tools": z.object({
        "label": z.string(),
        "headline": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "description": z.string(),
          "tag": z.string()
        }))
      }),
      "cta": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "ctaLabel": z.string(),
        "note": z.string()
      })
    }),
    services: z.object({
      "meta": z.object({
        "title": z.string(),
        "description": z.string()
      }),
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "services": z.array(z.object({
        "id": z.string(),
        "slug": z.string(),
        "title": z.string(),
        "tagline": z.string(),
        "description": z.string(),
        "useCases": z.array(z.string()),
        "outcome": z.string(),
        "icon": z.string()
      })),
      "pricing": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string(),
        "tiers": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "price": z.string(),
          "period": z.string(),
          "tagline": z.string(),
          "description": z.string(),
          "features": z.array(z.string()),
          "cta": z.string(),
          "highlighted": z.boolean()
        }))
      }),
      "cta": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "ctaLabel": z.string()
      })
    }),
    results: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "stats": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "label": z.string()
      })),
      "caseStudies": z.array(z.object({
        "id": z.string(),
        "industry": z.string(),
        "company": z.string(),
        "challenge": z.string(),
        "solution": z.string(),
        "results": z.array(z.object({
          "id": z.string(),
          "metric": z.string(),
          "description": z.string()
        })),
        "timeframe": z.string()
      })),
      "testimonials": z.array(z.object({
        "id": z.string(),
        "quote": z.string(),
        "author": z.string(),
        "company": z.string()
      })),
      "cta": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "buttonText": z.string(),
        "buttonHref": z.string()
      })
    }),
    book: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "whatToExpect": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "form": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "fields": z.object({
          "namePlaceholder": z.string(),
          "emailPlaceholder": z.string(),
          "companyPlaceholder": z.string(),
          "rolePlaceholder": z.string(),
          "teamSizeLabel": z.string(),
          "goalLabel": z.string(),
          "goalPlaceholder": z.string()
        }),
        "submitText": z.string(),
        "submittingText": z.string(),
        "successHeading": z.string(),
        "successMessage": z.string(),
        "errorMessage": z.string()
      }),
      "trust": z.array(z.object({
        "id": z.string(),
        "stat": z.string(),
        "label": z.string()
      }))
    }),
    contact: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "info": z.object({
        "heading": z.string(),
        "email": z.string(),
        "location": z.string(),
        "responseTime": z.string(),
        "links": z.array(z.object({
          "id": z.string(),
          "label": z.string(),
          "href": z.string(),
          "description": z.string()
        }))
      }),
      "form": z.object({
        "heading": z.string(),
        "namePlaceholder": z.string(),
        "emailPlaceholder": z.string(),
        "subjectOptions": z.array(z.string()),
        "messagePlaceholder": z.string(),
        "submitText": z.string(),
        "submittingText": z.string(),
        "successHeading": z.string(),
        "successMessage": z.string(),
        "errorMessage": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;