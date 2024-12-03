import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const observer = useRef();

  useEffect(() => {
    const fetchRecipes = async () => {
      const apiKey = "2dd69af55c384fc093537f2dc2d16595";
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=12&offset=${(page - 1) * 12}`);
        const data = await response.json();

        setRecipes((prev) => {
          const newRecipes = data.results.filter(recipe => !prev.some(r => r.id === recipe.id));
          return [...prev, ...newRecipes];
        });

        setFilteredRecipes((prev) => {
          const newRecipes = data.results.filter(recipe => !prev.some(r => r.id === recipe.id));
          return [...prev, ...newRecipes];
        });

        setHasMore(data.results.length > 0);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      ...filter,
    }));
    applyFilters(searchTerm, { ...selectedFilters, ...filter });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, selectedFilters);
  };

  const applyFilters = (searchValue, filters) => {
    const filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchValue);
      const matchesCuisine = filters.cuisine ? recipe.cuisine === filters.cuisine : true;
      const matchesDiet = filters.diet ? recipe.diet === filters.diet : true;
      const matchesMealType = filters.mealType ? recipe.mealType === filters.mealType : true;
      const matchesMaxTime = filters.maxTime ? recipe.readyInMinutes <= filters.maxTime : true;

      return matchesSearch && matchesCuisine && matchesDiet && matchesMealType && matchesMaxTime;
    });

    setFilteredRecipes(filtered);
  };

  const toggleFavorite = (recipeId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(recipeId)) {
        updatedFavorites.delete(recipeId);
      } else {
        updatedFavorites.add(recipeId);
      }
      return updatedFavorites;
    });
  };

  const lastRecipeElementRef = useRef();

  useEffect(() => {
    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(observerCallback);
    if (lastRecipeElementRef.current) {
      observer.current.observe(lastRecipeElementRef.current);
    }

    return () => {
      if (observer.current && lastRecipeElementRef.current) {
        observer.current.unobserve(lastRecipeElementRef.current);
      }
    };
  }, [lastRecipeElementRef.current, hasMore, isLoading]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-zinc-900 text-white flex py-20">
        <aside className="w-1/4 p-6 bg-zinc-800">
          <h2 className="text-xl font-bold mb-4">Search</h2>
          <input
            type="text"
            placeholder="Search for a recipe..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-6 p-2 border border-gray-700 bg-zinc-700 rounded w-full"
          />

          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block mb-2">Cuisine</label>
            <select
              className="bg-zinc-700 text-white p-2 rounded w-full"
              onChange={(e) => handleFilterChange({ cuisine: e.target.value })}
            >
              <option value="">All Cuisines</option>
              <option value="Italian">Italian</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Diet</label>
            <select
              className="bg-zinc-700 text-white p-2 rounded w-full"
              onChange={(e) => handleFilterChange({ diet: e.target.value })}
            >
              <option value="">All Diets</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="NonVeg">Non-Veg</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Meal Type</label>
            <select
              className="bg-zinc-700 text-white p-2 rounded w-full"
              onChange={(e) => handleFilterChange({ mealType: e.target.value })}
            >
              <option value="">All Meal Types</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Preparation Time (min)</label>
            <input
              type="number"
              placeholder="Max time"
              className="bg-zinc-700 text-white p-2 rounded w-full"
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : undefined;
                handleFilterChange({ maxTime: value });
              }}
            />
          </div>
          <Link to="/favorites">
            <h2 className="text-xl font-bold mb-4">Favorites</h2>
          </Link>
        </aside>

        <main className="w-3/4 p-6">
          <h2 className="text-2xl font-bold mb-6">Recipes</h2>

          {isLoading ? (
            <p>Loading recipes...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe, index) => {
                const isLastRecipe = index === filteredRecipes.length - 1;
                return (
                  <div key={recipe.id} className="relative block bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
                    <Link to={`/recipe/${recipe.id}`}>
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-bold">{recipe.title}</h3>
                      <p className="text-sm">Time: {recipe.readyInMinutes} min</p>
                      <p className="text-sm">Servings: {recipe.servings}</p>
                    </Link>
                    <button
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the link click
                        toggleFavorite(recipe.id);
                      }}
                    >
                      <FontAwesomeIcon icon={favorites.has(recipe.id) ? solidHeart : regularHeart} className="text-red-500" />
                    </button>
                    {isLastRecipe && <div ref={lastRecipeElementRef} />}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RecipePage;
