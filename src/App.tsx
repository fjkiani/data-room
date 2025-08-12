import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import DeckViewerPage from './pages/DeckViewerPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/deck/:deckId" element={<DeckViewerPage />} />
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
