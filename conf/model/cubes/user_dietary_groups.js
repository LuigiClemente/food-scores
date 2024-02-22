cube('UserDietaryGroups', {
  sql: `SELECT * FROM public.user_dietary_groups`,
  
  joins: {
    Users: {
      sql: `${CUBE}.user_id = ${Users}.userId`,
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
  },

  dimensions: {
    id: {
      sql: `CONCAT(${CUBE}.user_id, '-', ${CUBE}.group_id)`,
      type: `string`,
      primaryKey: true,
    },
    userId: {
      sql: `user_id`,
      type: `number`,
    },
    groupId: {
      sql: `group_id`,
      type: `number`,
    },
  },
});
