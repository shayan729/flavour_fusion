import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GoogleGenerativeAI } from "@google/generative-ai";

function SmartBites() {
  const [leftoverFood, setLeftoverFood] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipes, setRecipes] = useState([]);

  const API_KEY = 'AIzaSyAEJ3gcc3z2OjBH1bbwLv5FzhS5epto6vg'; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleInputChange = (event) => {
    setLeftoverFood(event.target.value);
  };

  const handleSubmit = async () => {
    if (!leftoverFood) {
      setError('Please enter leftover food.');
      return;
    }

    setLoading(true);
    setError('');
    setRecipes([]);

    const prompt = `Generate recipes where I can use leftover ${leftoverFood}.`;
    const generatedRecipes = [];

    try {
      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const chunkText = await chunk.text();
        generatedRecipes.push(chunkText);
      }

      // Clean up the generated text
      const cleanedDescription = generatedRecipes
        .join(' ')
        .replace(/##/g, '') // Remove headings
        .replace(/\*/g, '') // Remove bullet points
        .replace(/\n+/g, '\n') // Remove extra new lines
        .trim()
        .replace(/\. /g, '.\n\n'); // Add double line breaks after each period

      setRecipes([{ title: "Generated Recipe", description: cleanedDescription }]);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-900 text-white p-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">SmartBites</h1>
          <input 
            type="text" 
            value={leftoverFood} 
            onChange={handleInputChange} 
            placeholder="Enter leftover food" 
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
          />
          <button 
            onClick={handleSubmit} 
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500">
            Generate Recipes
          </button>

          {loading && <p className="mt-4">Loading...</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {recipes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Recipes Found:</h3>
              <ul className="list-disc pl-5">
                {recipes.map((recipe, index) => (
                  <li key={index} className="border border-gray-700 p-4 mb-4 rounded bg-gray-800">
                    <h4 className="text-xl font-semibold">{recipe.title}</h4>
                    <p className="mt-2">{recipe.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SmartBites;
