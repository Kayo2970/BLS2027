import React from 'react';
import PageHeader from '../components/PageHeader';
import Agenda from '../components/Agenda';
import Highlights from '../components/Highlights';
import Speakers from '../components/Speakers';
import FAQ from '../components/FAQ';

const Summit: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="The" 
        subtitle="A strategic leadership convening summit designed to equip the next generation of executives."
        highlight="Summit"
      />
      <Agenda />
      <Highlights showTitle={false} />
      <Speakers />
      <FAQ />
    </>
  );
};

export default Summit;