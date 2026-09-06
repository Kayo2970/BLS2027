
import React from 'react';
import PageHeader from '../components/PageHeader';
import PastInitiativesContent from '../components/PastInitiativesContent';

const PastInitiatives: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Our Past" 
        subtitle="A legacy of impactful events shaping the discourse on innovation and leadership."
        highlight="Initiatives"
      />
      <PastInitiativesContent />
    </>
  );
};

export default PastInitiatives;
