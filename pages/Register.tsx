import React from 'react';
import PageHeader from '../components/PageHeader';
import RegisterContent from '../components/RegisterContent';

const Register: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Delegate" 
        subtitle="Secure your place at the premier leadership summit of 2026."
        highlight="Registration"
      />
      <RegisterContent />
    </>
  );
};

export default Register;