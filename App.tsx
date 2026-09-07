
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Summit from './pages/Summit';
import Sponsorship from './pages/Sponsorship';
import ContactPage from './pages/ContactPage';
import Register from './pages/Register';
import PastInitiatives from './pages/PastInitiatives';
import DesignPro from './pages/DesignPro';

interface LayoutProps {
  children?: React.ReactNode;
}

// Routes that render their own full-screen chrome (nav/footer) and should
// skip the shared site Navbar/Contact footer.
const CHROMELESS_ROUTES = ['/', '/designpro'];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isChromeless = CHROMELESS_ROUTES.includes(location.pathname);
  // Hide the global footer on the Contact page since it has its own contact info
  const showFooter = location.pathname !== '/contact' && !isChromeless;

  if (isChromeless) {
    return (
      <div className="min-h-screen bg-black overflow-x-hidden">
        <ScrollToTop />
        <Analytics />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden flex flex-col">
      <ScrollToTop />
      <Analytics />
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      {showFooter && <Contact />}
    </div>
  );
};

function App() {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/summit" element={<Summit />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/past-initiatives" element={<PastInitiatives />} />
                <Route path="/designpro" element={<DesignPro />} />
            </Routes>
        </Layout>
    </Router>
  );
}

export default App;
