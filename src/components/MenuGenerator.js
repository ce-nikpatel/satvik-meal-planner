import React, { useState } from 'react';
import meals from '../data/meals.json';
import GroceryList from './GroceryList';

const ingredientCaloriesMap = {
  rice: 130,
  paneer: 120,
  potato: 85,
  chickpeas: 110,
  beans: 95,
  lentils: 105,
  dal: 100,
  noodle: 140,
  pasta: 150,
  flour: 90,
  wheat: 95,
  bread: 75,
  tortilla: 100,
  cheese: 110,
  butter: 100,
  ghee: 120,
  cream: 95,
  yogurt: 70,
  curd: 70,
  oil: 120,
  olive: 120,
  peanut: 90,
  nuts: 90,
  avocado: 90,
  corn: 80,
  peas: 70,
  spinach: 25,
  mushroom: 35,
  tomato: 20,
  onion: 25,
  "mixed vegetables": 50,
  vegetables: 50,
};

function getIngredientCalories(ingredient) {
  const key = ingredient.toLowerCase();
  const matched = Object.entries(ingredientCaloriesMap).find(([name]) => key.includes(name));
  return matched ? matched[1] : 40;
}

function estimateCalories(meal) {
  if (typeof meal.calories === 'number') return meal.calories;

  const ingredients = Array.isArray(meal.ingredients) ? meal.ingredients : [];
  const total = ingredients.reduce((sum, ingredient) => sum + getIngredientCalories(ingredient), 0);
  return Math.max(120, total);
}

function getMealCalorieBreakdown(meal) {
  const ingredients = Array.isArray(meal.ingredients) ? meal.ingredients : [];
  const lines = ingredients.map((ingredient) => ({
    ingredient,
    calories: getIngredientCalories(ingredient),
  }));
  const total = Math.max(120, lines.reduce((sum, line) => sum + line.calories, 0));
  return { lines, total };
}

function ImageWithFallback({ src, alt }) {
  const [status, setStatus] = useState(src ? 'loading' : 'hidden');

  if (!src || status === 'hidden') {
    return null;
  }

  return (
    <div className="meal-thumb-wrap">
      {status === 'loading' && <div className="thumb-placeholder" />}
      <img
        className="meal-thumb"
        src={src}
        alt={alt}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('hidden')}
        loading="lazy"
        style={{ opacity: status === 'loaded' ? 1 : 0, transition: 'opacity .18s linear' }}
      />
    </div>
  );
}

function MenuGenerator() {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [menu, setMenu] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [category, setCategory] = useState('all');
  const [infoMealId, setInfoMealId] = useState(null);

  const generateMenu = () => {
    let pool = [];
    if (category === 'all') pool = meals;
    else if (category === 'healthy') {
      pool = meals.filter((m) => Array.isArray(m.tags) && m.tags.includes('healthy'));
    } else {
      pool = meals.filter((m) => m.category === category);
    }

    const selected = [];
    const usedIds = new Set();

    while (selected.length < 7 && usedIds.size < pool.length) {
      const meal = pool[Math.floor(Math.random() * pool.length)];
      if (!usedIds.has(meal.id)) {
        usedIds.add(meal.id);
        selected.push({ ...meal });
      }
    }

    setMenu(selected);

    const aggregate = {};
    selected.forEach((m) => {
      m.ingredients.forEach((ing) => {
        aggregate[ing] = (aggregate[ing] || 0) + 1;
      });
    });

    const list = Object.entries(aggregate).map(
      ([item, count]) => (count > 1 ? `${item} x${count}` : item)
    );
    setGroceryList(list);
  };

  const weeklyCalories = menu.map((meal, index) => ({
    day: weekdays[index] || `Day ${index + 1}`,
    calories: estimateCalories(meal),
  }));
  const totalCalories = weeklyCalories.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div className="menu-generator">
      <h2 className="page-title">Weekly Vegetarian Dinner Planner</h2>
      <p className="instructions">
        Choose a category, then click Generate to get a randomized weekly dinner
        menu and matching grocery list. Click again to reshuffle.
      </p>

      <div className="controls">
        <label className="category-label">Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          <option value="all">All</option>
          <option value="hindu">Hindu</option>
          <option value="jain">Jain</option>
          <option value="healthy">Healthy</option>
        </select>
        <button className="generate-btn" onClick={generateMenu}>Generate Menu</button>
      </div>

      {menu.length > 0 && (
        <div className="results">
          <h2 className="section-title">Dinner Menu</h2>
          <div className="results-grid">
            <ul className="menu-list">
              {menu.map((meal, index) => (
                <li key={meal.id} className="meal-card">
                  <div className="card-inner">
                    <ImageWithFallback src={meal.image} alt={meal.name} />
                    <div className="meal-info">
                      <div>
                        <div className="meal-day">{weekdays[index] || `Day ${index + 1}`}</div>
                        <span className="meal-name">{meal.name}</span>
                        <div className="meal-calories-row">
                          <div className="meal-calories">{estimateCalories(meal)} kcal</div>
                          <button
                            type="button"
                            className="meal-info-btn"
                            aria-label="How calories are calculated"
                            aria-expanded={infoMealId === meal.id}
                            onClick={() => setInfoMealId((prev) => (prev === meal.id ? null : meal.id))}
                          >
                            i
                          </button>
                        </div>
                        {infoMealId === meal.id && (
                          <div className="meal-calorie-info">
                            <div className="meal-calorie-info-title">Calories by ingredient</div>
                            <ul>
                              {getMealCalorieBreakdown(meal).lines.map((line, lineIndex) => (
                                <li key={`${meal.id}-${line.ingredient}-${lineIndex}`}>
                                  <span>{line.ingredient}</span>
                                  <strong>{line.calories} kcal</strong>
                                </li>
                              ))}
                            </ul>
                            <div className="meal-calorie-total">
                              <span>Total</span>
                              <strong>{estimateCalories(meal)} kcal</strong>
                            </div>
                          </div>
                        )}
                        <div className={`badge ${meal.category}`}>{meal.category.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="side-panels">
              <GroceryList list={groceryList} />
              <div className="calories-list card">
                <h2>Calories List</h2>
                <ul>
                  {weeklyCalories.map((item) => (
                    <li key={item.day} className="calorie-item">
                      <span className="calorie-day">{item.day}</span>
                      <span className="calorie-value">{item.calories} kcal</span>
                    </li>
                  ))}
                </ul>
                <div className="calorie-total">
                  <span>Weekly Total</span>
                  <strong>{totalCalories} kcal</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuGenerator;
