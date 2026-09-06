import React from 'react';
import PageHeader from '../components/PageHeader';
import SponsorshipContent from '../components/Sponsorship';
import Partners from '../components/Partners';

const Sponsorship: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Become a" 
        subtitle="Unlock exclusive access to India's top sustainability leaders. Join our distinguished consortium."
        highlight="Partner"
      />
      <Partners id="partners" showCollaborators={true} />
      <SponsorshipContent />
    </>
  );
};

export default Sponsorship;