import React from 'react';
import ContentCard from './ContentCard';

export interface ContentItem {
  id: number;
  title: string;
  imageUrl: string;
  rating?: string;
  episodeCount?: string;
  isNew?: boolean;
}

interface ContentSectionProps {
  title: string;
  items: ContentItem[];
  seeMoreLink?: string;
}

const ContentSection = ({ title, items, seeMoreLink }: ContentSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="category-heading text-lg md:text-xl">{title}</h2>
        {seeMoreLink && (
          <a href={seeMoreLink} className="text-sm text-gray-500 hover:text-primary">
            查看更多 &gt;
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            rating={item.rating}
            episodeCount={item.episodeCount}
            isNew={item.isNew}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentSection;
