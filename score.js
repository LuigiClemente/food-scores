/**
 * Validates input arrays and objects for the main function and its helpers.
 * @param {Array|Object} input - The input to validate.
 * @param {String} type - The expected type of the input ('array' or 'object').
 * @returns {Boolean} - Whether the input is valid.
 */
function validateInputs(input, type) {
    if (type === 'array' && !Array.isArray(input)) {
        console.error('Invalid input: Expected an array.');
        return false;
    }
    if (type === 'object' && (typeof input !== 'object' || Array.isArray(input))) {
        console.error('Invalid input: Expected an object.');
        return false;
    }
    return true;
}

/**
 * Evaluates if a single food item meets complex criteria based on user preferences and choice scope.
 * Criteria evaluation includes checking against dietary restrictions, preference for certain nutrients,
 * and appropriateness for the meal time (choiceScope).
 * @param {Object} item - Single food item from the catalog.
 * @param {Object} userPreferences - User's dietary preferences.
 * @param {String} choiceScope - The scope of choice (e.g., 'breakfast', 'lunch', 'dinner').
 * @returns {Boolean} - True if the item meets the criteria; otherwise, false.
 */
function meetsCriteria(item, userPreferences, choiceScope) {
    // Placeholder logic for demonstration. Implement specific checks based on item properties and userPreferences.
    const { dietaryRestrictions, mealTimePreferences } = userPreferences;
    const { category, ingredients } = item;

    // Check dietary restrictions
    if (dietaryRestrictions.some(restriction => ingredients.includes(restriction))) {
        return false;
    }

    // Check meal time preferences
    if (!mealTimePreferences[choiceScope].includes(category)) {
        return false;
    }

    // Further criteria can be added here, such as caloric range, nutrient balance, etc.
    return true;
}

/**
 * Calculates a dynamic limit for recommendations based on user preferences and choice scope.
 * This considers user's lifestyle, meal frequency preferences, and any specific limitations.
 * @param {Object} userPreferences - User preferences including dietary restrictions.
 * @param {String} choiceScope - The scope of choice (e.g., 'breakfast', 'lunch', 'dinner').
 * @returns {Number} - The limit for recommendations.
 */
function getRecommendationsLimit(userPreferences, choiceScope) {
    // Example logic to dynamically determine recommendations limit.
    const { mealFrequency, lifestyle } = userPreferences;
    const baseLimit = mealFrequency[choiceScope] || 3; // Default to 3 if not specified

    // Adjust limit based on lifestyle; more active lifestyles might have a higher limit.
    const lifestyleAdjustments = { active: 2, sedentary: -1 };
    const adjustment = lifestyleAdjustments[lifestyle] || 0;

    return baseLimit + adjustment;
}

/**
 * Fetches user-specific food recommendations based on a catalog of food items,
 * user preferences, and a defined scope of choice.
 * This function filters the food catalog based on criteria, scores each item,
 * and returns the top-ranked items within the specified limit.
 * @param {Array} foodCatalog - The catalog of available food items.
 * @param {Object} userPreferences - The user's dietary preferences.
 * @param {String} choiceScope - The scope of choice (e.g., 'breakfast', 'lunch', 'dinner').
 * @returns {Array} - An array of recommended food items.
 */
function fetchUserRecommendations(foodCatalog, userPreferences, choiceScope) {
    if (!validateInputs(foodCatalog, 'array') || !validateInputs(userPreferences, 'object') || typeof choiceScope !== 'string') {
        return [];
    }

    // Filter items based on criteria and score them
    const scoredItems = foodCatalog
        .map(item => ({
            ...item,
            score: meetsCriteria(item, userPreferences, choiceScope) ? scoreFoodItem([item], userPreferences) : 0
        }))
        .filter(item => item.score > 0) // Retain items that meet criteria and have a positive score
        .sort((a, b) => b.score - a.score); // Sort by score in descending order

    const recommendationsLimit = getRecommendationsLimit(userPreferences, choiceScope);
    return scoredItems.slice(0, recommendationsLimit).map(item => item.foodName); // Return the top items within the limit
}

/**
 * Scores a food item or combination based on nutritional information and user preferences.
 * This comprehensive scoring function considers various nutritional factors and user preferences
 * to calculate a score that reflects the overall healthiness and suitability of the food item.
 * @param {Array} foodItems - An array of food items to score.
 * @param {Object} userPreferences - User preferences including dietary restrictions.
 * @returns {Number|null} - The calculated score, or null if inputs are invalid.
 */
function scoreFoodItem(foodItems, userPreferences) {
    if (!validateInputs(foodItems, 'array') || !validateInputs(userPreferences, 'object')) {
        return null;
    }

    // Calculate nutrition totals and adjust score based on user preferences
    let nutritionTotals = { calories: 0, carbs: 0, fats: 0, protein: 0, fiber: 0, sugar: 0 };
    for (let item of foodItems) {
        const { calories, carbs, fats, protein, fiber, sugar } = item;
        if ([calories, carbs, fats, protein, fiber, sugar].every(val => val !== undefined)) {
            nutritionTotals = {
                calories: nutritionTotals.calories + calories,
                carbs: nutritionTotals.carbs + carbs,
                fats: nutritionTotals.fats + fats,
                protein: nutritionTotals.protein + protein,
                fiber: nutritionTotals.fiber + fiber,
                sugar: nutritionTotals.sugar + sugar
            };
        } else {
            console.warn('Missing nutritional information in one or more food items');
        }
    }

    return adjustScoreBasedOnNutritionAndPreferences(nutritionTotals, userPreferences);
}

/**
 * Adjusts the score of food items based on their nutritional content and user preferences.
 * Incorporates a detailed evaluation of nutritional totals against user-defined weightings and penalties,
 * allowing for a nuanced scoring mechanism that aligns with health goals and dietary preferences.
 * @param {Object} nutritionTotals - The aggregated nutritional content of the food items.
 * @param {Object} userPreferences - The user's dietary preferences.
 * @returns {Number} - The adjusted score.
 */
function adjustScoreBasedOnNutritionAndPreferences(nutritionTotals, userPreferences) {
    let score = 0;
    const {
        proteinWeight = 2,
        fiberWeight = 1.5,
        sugarPenalty = 2,
        carbsPenalty = 1,
        fatPenalty = 1.2
    } = userPreferences.scores || {};

    // Adjust score based on nutrition and preferences
    score += (nutritionTotals.protein * proteinWeight) + (nutritionTotals.fiber * fiberWeight);
    score -= (nutritionTotals.sugar * sugarPenalty) + (nutritionTotals.carbs * carbsPenalty) + (nutritionTotals.fats * fatPenalty);

    return score;
}