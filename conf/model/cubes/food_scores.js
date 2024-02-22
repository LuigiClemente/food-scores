cube('FoodScores', {
  sql: `SELECT * FROM public.food_scores`,

  joins: {
    Foods: {
      sql: `${CUBE}.food_id = ${Foods}.foodId`,
      relationship: `belongsTo`,
    },
    DietaryGroups: {
      sql: `${CUBE}.group_id = ${DietaryGroups}.groupId`,
      relationship: `belongsTo`,
    },
  },

  measures: {
    count: {
      type: `count`,
    },
    averageNutritionScore: {
      sql: `nutrition_score`,
      type: `avg`,
    },
    // Define other averages similarly
  },

  dimensions: {
    scoreId: {
      sql: `score_id`,
      type: `number`,
      primaryKey: true,
    },
    // You can add dimensions for scores if needed
  },
});
