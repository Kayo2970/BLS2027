import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Share2 } from 'lucide-react';
import { VIDEO_UPDATES } from '../constants';

type SocialPlatform = 'instagram' | 'youtube' | 'linkedin' | 'generic';

interface SocialPost {
  id: string;
  type: string; // Changed to string to match constants.ts inference or explicit type if exported
  url: string;
  title?: string;
  embedHtml?: string;
}

const SocialCard: React.FC<{ post: any }> = ({ post }) => {
  // Adjusted aspect ratio for LinkedIn/Landscape videos (approx 5:4 or 4:3)
  const containerClass = "w-full aspect-[5/4] rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-white flex items-center justify-center relative";

  switch (post.type) {
    case 'instagram':
      return (
        <div className={containerClass}>
            <div 
                className="w-full h-full overflow-y-auto custom-scrollbar flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: post.embedHtml || '' }}
            />
        </div>
      );
    case 'youtube':
      return (
        <div className={containerClass}>
          <iframe 
            width="100%" 
            height="100%" 
            src={post.url} 
            title={post.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      );
    case 'linkedin':
      return (
        <div className={containerClass}>
             <iframe 
                src={post.url} 
                height="100%" 
                width="100%" 
                frameBorder="0" 
                allowFullScreen 
                title={post.title}
                className="w-full h-full"
            ></iframe>
        </div>
      );
    default:
      return null;
  }
};

const SocialWall: React.FC = () => {
  return (
    <div className="bg-white py-20 border-t border-slate-100">
      <SectionWrapper>
        <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest">
                <Share2 size={12} /> Video Gallery
            </span>
            <h2 className="text-4xl font-bold text-slate-900">Summit <span className="text-blue-600">Video Updates</span></h2>
            <p className="text-slate-500 mt-2">Official announcements, teasers, and information from across our platforms.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
            {VIDEO_UPDATES.map((post) => (
                <SocialCard key={post.id} post={post} />
            ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default SocialWall;
