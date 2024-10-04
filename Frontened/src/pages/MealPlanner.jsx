import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [planDuration, setPlanDuration] = useState('week');

  const formik = useFormik({
    initialValues: {
      proteinIntake: '',
      vegOption: '',
      allergy: '',
      weight: '',
      height: '',
    },
    onSubmit: async (values) => {
      const apiKey = "8ba975d8204348528eb0eeec9b5445b4";
      const { proteinIntake, vegOption, allergy } = values;

      try {
        const response = await fetch(
          `https://api.spoonacular.com/mealplanner/generate?targetCalories=${proteinIntake}&diet=${vegOption}&exclude=${allergy}&apiKey=${apiKey}`
        );
        const data = await response.json();
        setMealPlan(data);
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    },
  });

  const renderMealsForDay = (dayMeals) => {
    return dayMeals.map((meal) => (
      <li key={meal.id} className="mb-4">
        <h3 className="text-lg font-semibold">{meal.title}</h3>
        <p>Ready in: {meal.readyInMinutes} minutes</p>
        <p>Servings: {meal.servings}</p>
        <img
          src={`https://spoonacular.com/recipeImages/${meal.id}-556x370.jpg`}  // Ensure correct image path
          alt={meal.title}
          className="w-full h-auto rounded mt-2"
        />
        <Link to={`/recipe/${meal.id}`}>
          <button className="mt-2 text-blue-500 underline">View More</button>
        </Link>
      </li>
    ));
  };

  const renderWeeklyPlan = () => {
    if (!mealPlan) return null;
  
    return (
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Meal 1</th>
            <th className="px-4 py-2 text-left">Meal 2</th>
            <th className="px-4 py-2 text-left">Meal 3</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mealPlan.week).map((day) => (
            <tr key={day}>
              <td className="border px-4 py-2 capitalize">{day}</td>
              <td className="border px-4 py-2">
                {mealPlan.week[day].meals[0] && renderMealsForDay([mealPlan.week[day].meals[0]])}
              </td>
              <td className="border px-4 py-2">
                {mealPlan.week[day].meals[1] && renderMealsForDay([mealPlan.week[day].meals[1]])}
              </td>
              <td className="border px-4 py-2">
                {mealPlan.week[day].meals[2] && renderMealsForDay([mealPlan.week[day].meals[2]])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  return (
    <div>
        <Navbar />
        <div className="justify-between items-start p-4 bg-zinc-900 text-white py-20 min-h-screen">
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-zinc-800 p-8 ml-[20px] rounded-xl shadow-md w-full md:w-1/3"
            >
             

              {/* Form Fields */}
              <h2 className="text-2xl font-bold mb-4">Meal Planner</h2>

<div className="mb-4">
  <label className="block text-sm mb-2" htmlFor="proteinIntake">
    Protein Intake (grams)
  </label>
  <input
    className="w-full px-3 py-2 bg-zinc-700 rounded"
    id="proteinIntake"
    name="proteinIntake"
    type="number"
    onChange={formik.handleChange}
    value={formik.values.proteinIntake}
  />
</div>

<div className="mb-4">
  <label className="block text-sm mb-2" htmlFor="vegOption">
    Dietary Preference
  </label>
  <select
    className="w-full px-3 py-2 bg-zinc-700 rounded"
    id="vegOption"
    name="vegOption"
    onChange={formik.handleChange}
    value={formik.values.vegOption}
  >
    <option value="">Select...</option>
    <option value="vegetarian">Vegetarian</option>
    <option value="non-vegetarian">Non-Vegetarian</option>
  </select>
</div>

<div className="mb-4">
  <label className="block text-sm mb-2" htmlFor="allergy">
    Allergies (comma separated)
  </label>
  <input
    className="w-full px-3 py-2 bg-zinc-700 rounded"
    id="allergy"
    name="allergy"
    type="text"
    onChange={formik.handleChange}
    value={formik.values.allergy}
  />
</div>

<div className="mb-4">
  <label className="block text-sm mb-2" htmlFor="weight">
    Weight (kg)
  </label>
  <input
    className="w-full px-3 py-2 bg-zinc-700 rounded"
    id="weight"
    name="weight"
    type="number"
    onChange={formik.handleChange}
    value={formik.values.weight}
  />
</div>

<div className="mb-4">
  <label className="block text-sm mb-2" htmlFor="height">
    Height (cm)
  </label>
  <input
    className="w-full px-3 py-2 bg-zinc-700 rounded"
    id="height"
    name="height"
    type="number"
    onChange={formik.handleChange}
    value={formik.values.height}
  />
</div>

<div className="mb-4">
  <label className="block text-sm mb-2">Plan Duration</label>
  <select
    className="w-full px-3 py-2 bg-zinc-700 rounded"
    onChange={(e) => setPlanDuration(e.target.value)}
    value={planDuration}
  >
    <option value="week">For a Week</option>
    <option value="day">For a Day</option>
  </select>
</div>

<button type="submit" className="w-full bg-blue-500 py-2 rounded font-bold">
  Generate Meal Plan
</button>

             
            </form>

            <div className="bg-zinc-800 p-6 rounded-xl shadow-md w-full">
              <h3 className="text-xl font-bold mb-4">Today's Meal Plan</h3>
              <div className="flex flex-wrap gap-6 border-zinc-900">
                {mealPlan && renderMealsForDay(mealPlan.week[Object.keys(mealPlan.week)[0]].meals)}
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 ml-[20px] p-6 mt-5 rounded-xl shadow-md w-full">
            <h3 className="text-xl font-bold">Weekly Meal Plan</h3>
            {mealPlan && renderWeeklyPlan()}
          </div>
        </div>
    </div>
  );
};

export default MealPlanner;
