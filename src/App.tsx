import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import ServiceAreas from './pages/ServiceAreas';
import Contact from './pages/Contact';
import Quote from './pages/Quote';

export default function App() {
  return (
    <Router>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: 'easeOut' }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
          </Routes>
        </Layout>
      </MotionConfig>
    </Router>
  );
}
