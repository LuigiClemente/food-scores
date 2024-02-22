cube('Foods', {
  sql: `SELECT * FROM public.foods`,

  measures: {
    count: {
      type: `count`,
    },
  },

  dimensions: {
    foodId: {
      sql: `food_id`,
      type: `number`,
      primaryKey: true,
    },
    foodName: {
      sql: `food_name`,
      type: `string`,
    },
    category: {
      sql: `category`,
      type: `string`,
    },
    calories: {
      sql: `calories`,
      type: `number`,
    },
    // Add other nutritional info dimensions similarly
  },
});
