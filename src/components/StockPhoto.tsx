import React from 'react';

/**
 * Real photos from Unsplash (Unsplash License — free for commercial use,
 * no attribution required), served from Unsplash's image CDN so the site
 * bundle stays small. Every photo is referenced by its Unsplash photo id.
 */
export const unsplashUrl = (id: string, w: number, h?: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}` : ''}&fit=crop&auto=format&q=70`;

export const PHOTOS = {
  // Page banners
  aiAgents: { id: '1786539861543-e65b0867c3c0', alt: 'Orange service robot representing an AI digital employee' },
  webDevelopment: { id: '1551434678-e076c223a692', alt: 'Web developers working together at their desks' },
  solutions: { id: '1712903892077-194d5bad52a2', alt: 'Business owner using a tablet to manage her shop' },
  platform: { id: '1558494949-ef010cbdcc31', alt: 'Server racks and network infrastructure in a data center' },
  features: { id: '1723987251277-18fc0a1effd0', alt: 'Laptop showing a business analytics dashboard' },
  projects: { id: '1542744173-8e7e53415bb0', alt: 'Team reviewing a project together in a meeting room' },
  howItWorks: { id: '1623652554515-91c833e3080e', alt: 'Planning workshop with sticky notes on a board' },
  pricing: { id: '1686771416282-3888ddaf249b', alt: 'Business handshake after agreeing on a project scope' },
  resources: { id: '1499750310107-5fef28a66643', alt: 'Laptop and notebook on a desk for learning and research' },
  getStarted: { id: '1704770064557-416292d1f4bd', alt: 'Founder planning a new project on a laptop' },
  contact: { id: '1626863905121-3b0c0ed7b94c', alt: 'Friendly support specialist with a headset' },
  // Industries (home page)
  restaurants: { id: '1788999422915-81246819a93e', alt: 'Barista serving customers at a cafe counter' },
  ecommerceRetail: { id: '1770013413878-2530e2c3d82b', alt: 'Online store owner with order boxes checking her phone' },
  realEstate: { id: '1580587771525-78b9dba3b914', alt: 'Modern house with a pool for sale' },
  customerSupport: { id: '1766066014237-00645c74e9c6', alt: 'Customer support team with headsets' },
  sales: { id: '1622675363311-3e1904dc1885', alt: 'Sales team meeting with a client around a laptop' },
  customAi: { id: '1674027444485-cec3da58eef4', alt: 'Illustration of artificial intelligence as a glowing brain' },
  // Projects
  ecommerceGrowth: { id: '1460925895917-afdab827c52f', alt: 'Laptop showing ecommerce sales analytics' },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

interface StockPhotoProps {
  photo: PhotoKey;
  /** Width in px of the default (1x) image. */
  width: number;
  /** Aspect ratio as width / height, used for crop + intrinsic size. */
  ratio: number;
  className?: string;
  eager?: boolean;
  sizes?: string;
}

export const StockPhoto: React.FC<StockPhotoProps> = ({ photo, width, ratio, className, eager, sizes }) => {
  const { id, alt } = PHOTOS[photo];
  const h = (w: number) => Math.round(w / ratio);
  return (
    <img
      src={unsplashUrl(id, width, h(width))}
      srcSet={[0.5, 1, 1.5, 2]
        .map((m) => Math.round(width * m))
        .map((w) => `${unsplashUrl(id, w, h(w))} ${w}w`)
        .join(', ')}
      sizes={sizes || '100vw'}
      alt={alt}
      width={width}
      height={h(width)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  );
};

/** Wide photo banner shown under each inner page's header. */
export const PageBanner: React.FC<{ photo: PhotoKey; caption?: string }> = ({ photo, caption }) => (
  <figure className="relative mb-14 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-slate-950/60">
    <StockPhoto
      photo={photo}
      width={1280}
      ratio={1280 / 420}
      eager
      sizes="(min-width: 1280px) 1216px, 100vw"
      className="w-full h-48 sm:h-64 lg:h-[380px] object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
    {caption && (
      <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-left text-xs sm:text-sm font-medium text-slate-200">
        {caption}
      </figcaption>
    )}
  </figure>
);
