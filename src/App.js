import React from 'react';
import './App.css';
import MenuGenerator from './components/MenuGenerator';
import heroFood from './assets/hero-food.webp';
import categoryGreens from './assets/category-greens.webp';
import categoryGrains from './assets/category-grains.webp';
import categoryFruits from './assets/category-fruits.webp';
import categoryDairy from './assets/category-dairy.webp';

function App() {
  return (
    <div className="App app-shell">
      <header className="top-nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="brand-mark">Leaf</span>
            <span className="brand-name">Satvik</span>
          </div>
        </div>
      </header>

      <section
        className="hero"
        style={{ backgroundImage: `linear-gradient(105deg, rgba(33, 25, 20, 0.76), rgba(45, 33, 24, 0.58)), url(${heroFood})` }}
      >
        <div className="hero-content">
          <p className="hero-kicker">PURE · WHOLESOME · BALANCED</p>
          <h1>Nourish Your Body &amp; Soul</h1>
          <p>
            Plan your weekly sattvic meals with clean ingredients, balanced nutrition,
            and a simple grocery workflow.
          </p>
          <a href="#planner" className="hero-cta">Start Planning</a>
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
