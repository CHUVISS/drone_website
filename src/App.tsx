import React from 'react';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="drone-website">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;