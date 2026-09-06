import React from 'react';
import SectionWrapper from './SectionWrapper';
import { COMMITTEES } from '../constants';
import { motion } from 'framer-motion';
import { User, Award, Layers, Linkedin, ExternalLink, Users, Handshake } from 'lucide-react';

interface CommitteeMember {
  name: string;
  role: string;
  designation: string;
  image?: string;
  linkedin: string | null;
}

const CommitteeCard: React.FC<{ member: CommitteeMember, delay: number, type: 'exec' | 'core' }> = ({ member, delay, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`
        group relative overflow-hidden rounded-3xl border transition-all duration-500 flex flex-col
        ${type === 'exec' 
          ? 'bg-white border-slate-200 hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:border-blue-300' 
          : 'bg-slate-50 border-slate-100 hover:shadow-lg hover:border-blue-200'}
      `}
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <User size={80} />
      </div>
      
      <div className="p-6 relative z-10 flex flex-col h-full">
        <div className="relative w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-xl font-bold shadow-sm overflow-hidden bg-white">
           <div className="laser-line"></div>
           {member.image ? (
               <img 
                 src={member.image} 
                 alt={member.name} 
                 className="w-full h-full object-cover portrait-grayscale" 
               />
           ) : (
               <div className={`
                 w-full h-full flex items-center justify-center portrait-grayscale
                 ${type === 'exec' 
                    ? 'bg-gradient-to-br from-blue-100 to-cyan-50 text-blue-600' 
                    : 'bg-white text-slate-500'}
               `}>
                 {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
               </div>
           )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
          {member.name}
        </h3>
        
        <p className={`font-black text-[10px] uppercase tracking-[0.2em] mb-3 ${type === 'exec' ? 'text-orange-500' : 'text-blue-500'}`}>
          {member.role}
        </p>
        
        <p className="text-sm text-slate-500 mb-6 leading-snug font-medium italic">
          {member.designation}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Member</span>
          {member.linkedin ? (
            <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
            >
                <Linkedin className="w-4 h-4" />
            </a>
          ) : (
            <div className="p-2 text-slate-200">
                <Linkedin className="w-4 h-4 opacity-30" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Committees: React.FC = () => {
  return (
    <div className="bg-white py-20 relative">
      <SectionWrapper id="committees">
        
        {/* Executive Council Section */}
        <div className="mb-24 scroll-mt-24" id="executive-council">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Executive <span className="text-blue-600">Council</span></h2>
                <p className="text-sm text-slate-500">The steering council driving strategic summit initiatives.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMITTEES.executive.map((member, idx) => (
              <CommitteeCard key={idx} member={member} delay={idx * 0.1} type="exec" />
            ))}
          </div>
        </div>

        {/* Core Committee Section */}
        <div id="organizing-committee" className="scroll-mt-24">
           <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Organizing <span className="text-purple-600">Committee</span></h2>
                <p className="text-sm text-slate-500">Managing operations and campus-wide coordination.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMITTEES.core.map((member, idx) => (
              <CommitteeCard key={idx} member={member} delay={idx * 0.1} type="core" />
            ))}
          </div>
        </div>

        {/* Organizing Committee Members Section */}
        <div id="organizing-members" className="mt-24 scroll-mt-24">
           <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-green-50 rounded-xl text-green-600 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Organizing <span className="text-green-600">Committee Members</span></h2>
                <p className="text-sm text-slate-500">The dedicated team executing the vision.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* @ts-ignore */}
            {COMMITTEES.organizingMembers?.map((member, idx) => (
              <CommitteeCard key={idx} member={member} delay={idx * 0.05} type="core" />
            ))}
          </div>
        </div>

        {/* Collaborative Partners Section */}
        <div id="collaborative-partners" className="mt-24 scroll-mt-24">
           <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-orange-50 rounded-xl text-orange-600 shadow-sm">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Collaborative <span className="text-orange-600">Partners</span></h2>
                <p className="text-sm text-slate-500">Strategic partners supporting our mission.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* @ts-ignore */}
            {COMMITTEES.collaborativePartners?.map((member, idx) => (
              <CommitteeCard key={idx} member={member} delay={idx * 0.05} type="core" />
            ))}
          </div>
        </div>


      </SectionWrapper>
    </div>
  );
};

export default Committees;