cube('DietaryGroups', {
  sql: `SELECT * FROM public.dietary_groups`,

  measures: {
    count: {
      type: `count`,
    },
  },

  dimensions: {
    groupId: {
      sql: `group_id`,
      type: `number`,
      primaryKey: true,
    },
    groupName: {
      sql: `group_name`,
      type: `string`,
    },
    description: {
      sql: `description`,
      type: `string`,
    },
  },
});
