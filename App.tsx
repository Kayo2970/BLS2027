
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  // Hide the global footer on the Contact page since it has its own contact info
  const showFooter = location.pathname !== '/contact';

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
            </Routes>
        </Layout>
    </Router>
  );
}

export default App;
