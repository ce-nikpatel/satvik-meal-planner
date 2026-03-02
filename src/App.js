import React from 'react';
import './App.css';
import MenuGenerator from './components/MenuGenerator';
import logo from './assets/logo.svg';
import heroFood from './assets/hero-food.webp';
import categoryGreens from './assets/category-greens.webp';
import categoryGrains from './assets/category-grains.webp';
import categoryFruits from './assets/category-fruits.webp';
import categoryDairy from './assets/category-dairy.webp';

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

      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.35)), url(${heroFood})`,
        }}
      >
        <div className="hero-content">
          <p className="hero-kicker">PURE · WHOLESOME · BALANCED</p>
          <h1>Your Weekly Vegetarian Meal Planner</h1>
          <p>
            Generate a complete week of delicious vegetarian dinners with automatic grocery lists and calorie tracking.
          </p>
          <a href="#planner" className="hero-cta">Get Started</a>
        </div>
      </section>

      <section className="category-showcase">
        <div className="category-grid">
          <article className="category-card">
            <img src={categoryGreens} alt="Fresh greens" />
            <h3>Fresh Greens</h3>
          </article>
          <article className="category-card">
            <img src={categoryGrains} alt="Grains and lentils" />
            <h3>Grains &amp; Lentils</h3>
          </article>
          <article className="category-card">
            <img src={categoryFruits} alt="Seasonal fruits" />
            <h3>Seasonal Fruits</h3>
          </article>
          <article className="category-card">
            <img src={categoryDairy} alt="Dairy and ghee" />
            <h3>Dairy &amp; Ghee</h3>
          </article>
        </div>
      </section>

      <main id="planner" className="planner-wrap">
        <MenuGenerator />
      </main>
    </div>
  );
}

export default App;
