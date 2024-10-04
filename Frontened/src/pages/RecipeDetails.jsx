import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DOMPurify from 'dompurify';
import { Radar } from 'react-chartjs-2';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const apiKey = "8ba975d8204348528eb0eeec9b5445b4";
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        const data = await response.json();
        setRecipeDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Add logic to create a cart (e.g., save to local storage or send to backend)
    alert('Recipe added to cart!');
  };

  const getNutritionalData = () => {
    if (recipeDetails && recipeDetails.nutrition) {
      const nutrients = recipeDetails.nutrition.nutrients;
      return {
        labels: nutrients.map(nutrient => nutrient.name),
        datasets: [
          {
            label: 'Nutritional Info',
            data: nutrients.map(nutrient => nutrient.amount),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    }
    return null;
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-zinc-900 text-white p-6 py-20">
        {isLoading ? (
          <p>Loading recipe details...</p>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{recipeDetails.title}</h1>
            <img
              src={recipeDetails.image}
              alt={recipeDetails.title}
              className="w-full h-auto mb-6 rounded-lg"
            />
            <div className="text-xl mb-6">
              <h2 className="font-bold mb-4">Summary</h2>
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipeDetails.summary) }} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="mb-6 list-disc list-inside">
              {recipeDetails.extendedIngredients?.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            {recipeDetails.analyzedInstructions?.length > 0 ? (
              <div className="space-y-4">
                {recipeDetails.analyzedInstructions[0].steps.map((step) => (
                  <p key={step.number}>
                    <span className="font-bold">Step {step.number}:</span> {step.step}
                  </p>
                ))}
              </div>
            ) : (
              <p>No instructions available for this recipe.</p>
            )}

            {/* Nutritional Information */}
            <h2 className="text-2xl font-bold mb-4">Nutritional Information</h2>
            {recipeDetails.nutrition && (
              <Radar data={getNutritionalData()} options={{ responsive: true }} />
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
