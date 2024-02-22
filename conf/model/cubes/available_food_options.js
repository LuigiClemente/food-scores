cube('AvailableFoodOptions', {
  sql: `SELECT * FROM public.available_food_options`,

  joins: {
    Users: {
      sql: `${CUBE}.user_id = ${Users}.userId`,
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
    optionId: {
      sql: `option_id`,
      type: `number`,
      primaryKey: true,
    },
    optionType: {
      sql: `option_type`,
      type: `string`,
    },
  },
});
