# Satvik Meal Planner

A React app that generates a weekly vegetarian dinner menu, builds a grocery list, and shows calorie insights for each meal.

## What This App Does

- Generates up to 7 random dinner meals (Monday to Sunday)
- Supports category filters: `All`, `Hindu`, `Jain`, `Healthy`
- Builds a combined grocery list with item counts (example: `tomato x3`)
- Shows estimated calories on each meal card
- Shows a weekly calories panel with daily values and total
- Includes an `i` button on each meal card to view ingredient-wise calorie breakdown

## Calorie Logic

- If a meal has `calories` in data, that exact value is used
- Otherwise, calories are estimated by summing ingredient-level calorie estimates
- The card `i` popup shows the breakdown used for that meal

## Tech Stack

- React (Create React App)
- CSS (custom styling)
- JSON dataset (`src/data/meals.json`)

## Run Locally

1. Install dependencies
```bash
npm install
```

2. Start development server
```bash
npm start
```

3. Open:
`http://localhost:3000`

## Docker

This repo includes a multistage Docker build (Node build + Nginx serve).

### Build image
```bash
docker build -t satvik-meal-planner .
```

### Run container
```bash
docker run --rm -p 3001:80 satvik-meal-planner
```

Open:
`http://localhost:3001`

### Docker Compose
```bash
docker-compose up --build
```

Open:
`http://localhost:3001`

## Available Scripts

- `npm start` - run in development mode
- `npm test` - run tests
- `npm run build` - build production bundle
- `npm run eject` - eject CRA config

## Project Structure (Important Files)

- `src/components/MenuGenerator.js` - menu generation, calorie calculation, UI logic
- `src/components/GroceryList.js` - grocery list rendering
- `src/data/meals.json` - meals dataset
- `src/App.css` - app styling
- `Dockerfile` / `docker-compose.yml` - container setup

## Notes

- Meal images are loaded from external URLs; if an image fails, the card still works without it
- You can add more meals in `src/data/meals.json` using unique `id`, `name`, `category`, `ingredients`, and optional `tags`/`calories`
