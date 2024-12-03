// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import DOMPurify from 'dompurify';

// const RecipeDetails = () => {
//   const { id } = useParams();
//   const [recipeDetails, setRecipeDetails] = useState(null);
//   const [nutritionLabel, setNutritionLabel] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipeDetails = async () => {
//       const apiKey = "d55d56c7758142cb986ae3b99d8e14ea";
//       try {
//         const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch recipe details: ${response.status}`);
//         }
//         const data = await response.json();
//         setRecipeDetails(data);
//         await fetchNutritionLabel(); // Fetch nutrition label directly
//       } catch (error) {
//         setError(error.message);
//         console.error('Error fetching recipe details:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchNutritionLabel = async () => {
//       const apiKey = "d55d56c7758142cb986ae3b99d8e14ea";
//       try {
//         const response = await fetch(`https://api.spoonacular.com/recipes/${id}/nutritionLabel?apiKey=${apiKey}`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch nutrition label: ${response.status}`);
//         }
//         const data = await response.text();
//         setNutritionLabel(data);
//       } catch (error) {
//         setError(error.message);
//         console.error('Error fetching nutrition label:', error);
//       }
//     };

//     fetchRecipeDetails();
//   }, [id]);

//   const handleAddToCart = () => {
//     alert('Recipe added to cart!');
//   };

//   const speakSteps = (steps) => {
//     const utterance = new SpeechSynthesisUtterance(steps);
//     speechSynthesis.speak(utterance);
//   };

//   if (isLoading) {
//     return <p>Loading recipe details...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-zinc-900 text-white p-6 py-20">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold mb-6">{recipeDetails.title}</h1>
//           <img
//             src={recipeDetails.image}
//             alt={recipeDetails.title}
//             className="w-full h-auto mb-6 rounded-lg"
//           />
//           <div className="text-xl mb-6">
//             <h2 className="font-bold mb-4">Summary</h2>
//             <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipeDetails.summary) }} />
//           </div>
//           <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
//           <ul className="mb-6 list-disc list-inside">
//             {recipeDetails.extendedIngredients?.map((ingredient) => (
//               <li key={ingredient.id}>{ingredient.original}</li>
//             ))}
//           </ul>
//           <h2 className="text-2xl font-bold mb-4">Instructions</h2>
//           {recipeDetails.analyzedInstructions?.length > 0 ? (
//             <div className="space-y-4">
//               {recipeDetails.analyzedInstructions[0].steps.map((step) => (
//                 <p key={step.number}>
//                   <span className="font-bold">Step {step.number}:</span> {step.step}
//                 </p>
//               ))}
//               <button
//                 onClick={() => speakSteps(recipeDetails.analyzedInstructions[0].steps.map(step => step.step).join('. '))}
//                 className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-500"
//               >
//                 Read Steps Aloud
//               </button>
//             </div>
//           ) : (
//             <p>No instructions available for this recipe.</p>
//           )}

//           <br />
//           {/* Nutritional Information */}
//           <h2 className="text-2xl font-bold mb-4">Nutritional Information</h2>
//           {nutritionLabel ? (
//             <div>
//               <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nutritionLabel) }} />
//             </div>
//           ) : (
//             <p>No nutritional information available.</p>
//           )}

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="mt-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DOMPurify from 'dompurify';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [nutritionLabel, setNutritionLabel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const apiKey = "2dd69af55c384fc093537f2dc2d16595";
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe details: ${response.status}`);
        }
        const data = await response.json();
        setRecipeDetails(data);
        await fetchNutritionLabel(); // Fetch nutrition label directly
      } catch (error) {
        setError(error.message);
        console.error('Error fetching recipe details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchNutritionLabel = async () => {
      const apiKey = "2dd69af55c384fc093537f2dc2d16595";
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/nutritionLabel?apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch nutrition label: ${response.status}`);
        }
        const data = await response.text();
        setNutritionLabel(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching nutrition label:', error);
      }
    };

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices.find(voice => voice.name.includes("Google US English")) || availableVoices[0]);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    fetchRecipeDetails();
  }, [id]);

  const handleAddToCart = () => {
    alert('Recipe added to cart!');
  };

  const speakSteps = (steps) => {
    if (utterance) {
      speechSynthesis.cancel(); // Stop any ongoing speech
    }
    const newUtterance = new SpeechSynthesisUtterance(steps);
    newUtterance.voice = selectedVoice;
    setUtterance(newUtterance);
    speechSynthesis.speak(newUtterance);
  };

  const handlePause = () => {
    speechSynthesis.pause();
  };

  const handleResume = () => {
    speechSynthesis.resume();
  };

  const handleStop = () => {
    speechSynthesis.cancel();
  };

  if (isLoading) {
    return <p>Loading recipe details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-zinc-900 text-white p-6 py-20">
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
              <button
                onClick={() => speakSteps(recipeDetails.analyzedInstructions[0].steps.map(step => step.step).join('. '))}
                className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-500"
              >
                Read Steps Aloud
              </button>
              <div className="mt-4">
                <h3 className="text-lg font-bold">Select Voice:</h3>
                <select
                  value={selectedVoice?.name}
                  onChange={(e) => setSelectedVoice(voices.find(voice => voice.name === e.target.value))}
                  className="mt-2 p-2 rounded bg-gray-800 text-white"
                >
                  {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>{voice.name}</option>
                  ))}
                </select>
                <div className="mt-2">
                  <button onClick={handlePause} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400 mr-2">Pause</button>
                  <button onClick={handleResume} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400 mr-2">Resume</button>
                  <button onClick={handleStop} className="bg-red-500 text-white p-2 rounded hover:bg-red-400">Stop</button>
                </div>
              </div>
            </div>
          ) : (
            <p>No instructions available for this recipe.</p>
          )}

          <br />
          {/* Nutritional Information */}
          <h2 className="text-2xl font-bold mb-4">Nutritional Information</h2>
          {nutritionLabel ? (
            <div>
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nutritionLabel) }} />
            </div>
          ) : (
            <p>No nutritional information available.</p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
