import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import './App.css';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const DeckViewerPage = React.lazy(() => import('./pages/DeckViewerPage'));
const SiteHomePage = React.lazy(() => import('./pages/SiteHomePage'));

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-slate-500">Loading…</div>}>
            <Routes>
              <Route path="/deck/:deckId" element={<DeckViewerPage />} />
              <Route path="/site" element={<SiteHomePage />} />
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
