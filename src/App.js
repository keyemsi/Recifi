import React, { useState, useEffect } from "react";
import "./App.css";
const MasterChefApp = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [favorites, setFavorites] = useState([]);
  
  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch meals by category
  const fetchMealsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setMeals(data.meals);
      setSelectedMeal(null);
      setActiveCategory(category);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
    setLoading(false);
  };

  // Fetch meal details by id
  const fetchMealDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setSelectedMeal(data.meals[0]);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
    setLoading(false);
  };

  // Search meals
  const searchMeals = async (term) => {
    if (!term) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
      setSelectedMeal(null);
      setActiveCategory("");
    } catch (error) {
      console.error("Error searching meals:", error);
    }
    setLoading(false);
  };

  // Get random meal
  const getRandomMeal = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      setSelectedMeal(data.meals[0]);
      setMeals([]);
      setActiveCategory("");
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
    setLoading(false);
  };

  // Format Instructions into a list
  const formatInstructions = (instructions) => {
    const steps = instructions
      .split("\n")
      .filter((step) => step.trim() !== "")
      .map((step, index) => `${index + 1}. ${step.trim()}`);
    return steps.join("\n");
  };

  // Format ingredients and measures into a list
  const getIngredientsList = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  // favorite section

  const isFavorite = (mealId) => {
    return favorites.some((fav) => fav.idMeal === mealId);
  };

  const addToFavorites = (meal) => {
    // Verificar si el platillo ya está en favoritos
    if (!favorites.some((fav) => fav.idMeal === meal.idMeal)) {
      setFavorites([...favorites, meal]);
      //  localStorage save
      localStorage.setItem(
        "favoriteMeals",
        JSON.stringify([...favorites, meal])
      );
    }
  };

  const removeFromFavorites = (mealId) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== mealId);
    setFavorites(updatedFavorites);
    // localStorage update
    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
  };

  // localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteMeals");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">👨‍🍳 MasterChef Recipe Finder</h1>
        <button onClick={getRandomMeal} className="button">
          🎲 i do not know how to prepare
        </button>
      </header>

      <div className="searchContainer">
        <span className="searchIcon">🔍</span>
        <input
          type="text"
          placeholder="Type a meal...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchMeals(searchTerm)}
          className="searchInput"
        />
      </div>

      <div className="categoryContainer">
        {categories.map((category) => (
          <button
            className={`categoryButton ${
              activeCategory === category.strCategory
                ? "categoryButtonActive"
                : ""
            }`}
            key={category.idCategory}
            onClick={() => fetchMealsByCategory(category.strCategory)}
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      <button
        className={`categoryButton ${
          activeCategory === "Favorites" ? "categoryButtonActive" : ""
        }`}
        onClick={() => {
          setMeals(favorites);
          setActiveCategory("Favorites");
          setSelectedMeal(null);
        }}
      >
        ❤️ Favorites
      </button>

      {loading && <div className="loadingText">Loading...</div>}

      {!selectedMeal && meals && (
        <div className="mealsGrid">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="mealCard"
              onClick={() => fetchMealDetails(meal.idMeal)}
            >
              <img
                className="mealImage"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <h3 className="mealTitle">{meal.strMeal}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedMeal && (
        <div className="selectedMealContainer">
          <div className="selectedMealContent">
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="mealImage"
            />
            <div>
              <button
                onClick={() => {
                  isFavorite(selectedMeal.idMeal)
                    ? removeFromFavorites(selectedMeal.idMeal)
                    : addToFavorites(selectedMeal);
                }}
                className={`favoriteButton ${
                  isFavorite(selectedMeal.idMeal) ? "active" : ""
                }`}
              >
                {isFavorite(selectedMeal.idMeal)
                  ? "❤️ Remove from Favorites"
                  : "🤍 Add to Favorites"}
              </button>

              <h2 className="title">{selectedMeal.strMeal}</h2>

              <p>
                Category: {selectedMeal.strCategory} | Source:{" "}
                {selectedMeal.strArea}
              </p>

              <div>
                <h3>Ingredients:</h3>
                <ul className="ingredientsList">
                  {getIngredientsList(selectedMeal).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Instructions:</h3>
                <p className="instructions">
                  {formatInstructions(selectedMeal.strInstructions)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterChefApp;
