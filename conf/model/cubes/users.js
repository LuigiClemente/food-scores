cube('Users', {
  sql: `SELECT * FROM public.users`,

  measures: {
    count: {
      type: `count`,
    },
  },

  dimensions: {
    userId: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
    },
    userName: {
      sql: `user_name`,
      type: `string`,
    },
    phoneNumber: {
      sql: `phone_number`,
      type: `string`,
    },
  },
});
