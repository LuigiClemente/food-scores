cube('Recommendations', {
  sql: `SELECT * FROM public.recommendations`,

  joins: {
    Users: {
      sql: `${CUBE}.user_id = ${Users}.userId`,
      relationship: `belongsTo`,
    },
  },

  measures: {
    count: {
      type: `count`,
    },
  },

  dimensions: {
    recommendationId: {
      sql: `recommendation_id`,
      type: `number`,
      primaryKey: true,
    },
    recommendationCriteria: {
      sql: `recommendation_criteria`,
      type: `string`,
    },
    createdAt: {
      sql: `created_at`,
      type: `time`,
    },
  },
});
