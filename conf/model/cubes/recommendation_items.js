cube('RecommendationItems', {
  sql: `SELECT * FROM public.recommendation_items`,

  joins: {
    Recommendations: {
      sql: `${CUBE}.recommendation_id = ${Recommendations}.recommendationId`,
      relationship: `belongsTo`,
    },
    Foods: {
      sql: `${CUBE}.food_id = ${Foods}.foodId`,
      relationship: `belongsTo`,
    },
  },

  measures: {
    count: {
      type: `count`,
    },
  },

  dimensions: {
    recommendationItemId: {
      sql: `recommendation_item_id`,
      type: `number`,
      primaryKey: true,
    },
    portion: {
      sql: `portion`,
      type: `string`,
    },
    priority: {
      sql: `priority`,
      type: `number`,
    },
  },
});
