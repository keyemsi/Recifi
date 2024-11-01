# 👨‍🍳 MasterChef Recipe Finder

## Description

MasterChef Recipe Finder is a React-based web application that helps users discover, search, and save their favorite recipes from around the world. The application uses TheMealDB API to provide users with access to a vast collection of recipes, complete with ingredients, instructions, and images.

## Features

- 🔍 Search recipes by name
- 📑 Browse recipes by category
- 🎲 Get random recipe suggestions
- ❤️ Save favorite recipes
- 📱 Responsive design for all devices
- 💾 Local storage for persistent favorites

## Technologies Used

- React.js
- JavaScript (ES6+)
- CSS3
- TheMealDB API
- LocalStorage API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/masterchef-recipe-finder.git
```

2. Navigate to the project directory:
```bash
cd masterchef-recipe-finder
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open the application in your browser:
```
http://localhost:3000
```

## Usage

### Searching for Recipes
- Use the search bar at the top of the page to find recipes by name
- Press Enter or click the search icon to initiate the search

### Browsing Categories
- Click on any category button to view recipes within that category
- Categories include options like Beef, Chicken, Dessert, etc.

### Random Recipe
- Click the "I do not know how to prepare" button to get a random recipe suggestion

### Managing Favorites
- Click the heart icon on any recipe card to add it to favorites
- Access your favorite recipes by clicking the "Favorites" category
- Remove recipes from favorites by clicking the heart icon again

## API Integration

The application uses the following endpoints from TheMealDB API:

- Categories: `www.themealdb.com/api/json/v1/1/categories.php`
- Filter by Category: `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
- Search by Name: `www.themealdb.com/api/json/v1/1/search.php?s=${term}`
- Get Random Recipe: `www.themealdb.com/api/json/v1/1/random.php`
- Get Recipe Details: `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

## Project Structure

```
masterchef-recipe-finder/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Main Components

### MasterChefApp
- Main container component
- Manages state and API calls
- Handles recipe searching and filtering

### Features
1. **Category Navigation**
   - Displays available recipe categories
   - Handles category selection and filtering

2. **Search Functionality**
   - Real-time search input
   - API integration for recipe search

3. **Recipe Display**
   - Grid layout for recipe cards
   - Detailed view for selected recipes

4. **Favorites System**
   - Add/remove recipes to favorites
   - LocalStorage integration for persistence
   - Favorites management interface

## State Management

The application manages the following states:
- `categories`: Available recipe categories
- `meals`: Current displayed recipes
- `selectedMeal`: Currently selected recipe details
- `searchTerm`: Current search input value
- `loading`: Loading state indicator
- `activeCategory`: Currently selected category
- `favorites`: User's favorite recipes

## Local Storage

The application uses localStorage to persist the following data:
- Favorite recipes list
- Last selected category (optional)

## Styling

The application uses custom CSS with:
- Responsive grid layouts
- Flexible components
- Mobile-first approach
- Interactive animations
- Consistent color scheme

## Future Enhancements

Potential improvements for future versions:
- User authentication
- Recipe ratings and reviews
- Share recipes functionality
- Print recipe feature
- Dietary filters
- Custom recipe creation
- Shopping list generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

