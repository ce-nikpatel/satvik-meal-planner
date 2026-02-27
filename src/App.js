import React from 'react';
import './App.css';
import MenuGenerator from './components/MenuGenerator';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        {/* local app logo */}
        <img src="/logo.svg" className="logo" alt="Meal planner logo" />
        <h1>Meal Planner</h1>
        <p className="tagline">Healthy meals &amp; grocery list in one click</p>
      </header>
      <MenuGenerator />
    </div>
  );
}

export default App;
