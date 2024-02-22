cube('Preferences', {
  sql: `SELECT * FROM public.preferences`,

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
    preferenceId: {
      sql: `preference_id`,
      type: `number`,
      primaryKey: true,
    },
    preferenceDetails: {
      sql: `preference_details`,
      type: `string`,
    },
  },
});
