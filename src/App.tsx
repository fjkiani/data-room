import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import './App.css';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const DeckViewerPage = React.lazy(() => import('./pages/DeckViewerPage'));
const SiteHomePage = React.lazy(() => import('./pages/SiteHomePage'));
const ProductOracle = React.lazy(() => import('./pages/ProductOracle'));
const ProductForge = React.lazy(() => import('./pages/ProductForge'));
const ProductCommandCenter = React.lazy(() => import('./pages/ProductCommandCenter'));
const ProductBoltz = React.lazy(() => import('./pages/ProductBoltz'));
const BiotechTransformation = React.lazy(() => import('./pages/BiotechTransformation'));
const ClinicalTransformation = React.lazy(() => import('./pages/ClinicalTransformation'));
const GeneticTestingTransformation = React.lazy(() => import('./pages/GeneticTestingTransformation'));
const DemoFactoryPage = React.lazy(() => import('./pages/DemoFactoryPage'));
const UseCaseDemoPage = React.lazy(() => import('./pages/UseCaseDemoPage'));
const UseCasesIndex = React.lazy(() => import('./pages/UseCasesIndex'));

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="min-h-screen bg-slate-900">
          <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-white">Loading…</div>}>
            <Routes>
              <Route path="/deck/:deckId" element={<DeckViewerPage />} />
              <Route path="/site" element={<SiteHomePage />} />
              <Route path="/site/oracle" element={<ProductOracle />} />
              <Route path="/site/forge" element={<ProductForge />} />
              <Route path="/site/command-center" element={<ProductCommandCenter />} />
              <Route path="/site/boltz" element={<ProductBoltz />} />
              <Route path="/site/biotech-transformation" element={<BiotechTransformation />} />
              <Route path="/site/clinical-transformation" element={<ClinicalTransformation />} />
              <Route path="/site/genetic-testing-transformation" element={<GeneticTestingTransformation />} />
              <Route path="/site/demo-factory" element={<DemoFactoryPage />} />
              <Route path="/site/use-cases" element={<UseCasesIndex />} />
              <Route path="/site/demo/usecase/:id" element={<UseCaseDemoPage />} />
              {/* Legacy aliases */}
              <Route path="/ProductOracle" element={<Navigate to="/site/oracle" replace />} />
              <Route path="/ProductForge" element={<Navigate to="/site/forge" replace />} />
              <Route path="/ProductCommandCenter" element={<Navigate to="/site/command-center" replace />} />
              <Route path="/ProductBoltz" element={<Navigate to="/site/boltz" replace />} />
              <Route path="/" element={
                <>
                  <Header />
                  <HomePage />
                </>
              } />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
