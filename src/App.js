import React from 'react';
import './App.css';
import MenuGenerator from './components/MenuGenerator';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className="App">
      <header className="top-nav">
        <div className="nav-inner">
          <a href="/" className="brand">
            <img src={logo} alt="Satvik Meal Planner" className="brand-logo" />
            <span className="brand-name">Satvik Meal Planner</span>
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-kicker">PURE · WHOLESOME · BALANCED</p>
          <h1>Your Weekly Vegetarian Meal Planner</h1>
          <p>
            Generate a complete week of delicious vegetarian dinners with automatic grocery lists and calorie tracking.
          </p>
          <a href="#planner" className="hero-cta">Get Started</a>
        </div>
      </section>

      <main id="planner" className="planner-wrap">
        <MenuGenerator />
      </main>
    </div>
  );
}

export default App;
