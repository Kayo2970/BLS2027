import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA4 only once
    const measurementId = "G-R5FKFZYBV2";
    
    if (measurementId) {
      if (!window.gaInitialized) {
        ReactGA.initialize(measurementId);
        window.gaInitialized = true;
      }
      
      // Send pageview with a custom path
      ReactGA.send({ 
        hitType: "pageview", 
        page: location.pathname + location.search 
      });
    }
  }, [location]);

  return null;
};

// Add type definition for window.gaInitialized
declare global {
  interface Window {
    gaInitialized: boolean;
  }
}

export default Analytics;
