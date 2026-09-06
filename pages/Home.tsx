
import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Stats from '../components/Stats';
import HomeAboutTeaser from '../components/HomeAboutTeaser';
import Highlights from '../components/Highlights';
import Gallery from '../components/Gallery';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Partners showCollaborators={false} />
      <Stats />
      <HomeAboutTeaser />
      <Highlights limit={3} />
      <Gallery />
      
      {/* CTA Section */}
      <div className="bg-slate-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Lead the Change?</h2>
            <p className="text-slate-400 text-lg mb-8">Join 100+ delegates and industry leaders at the most significant sustainability summit of the year.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30">
                Register Now <ArrowRight />
            </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
