cube('Translations', {
  sql: `SELECT * FROM public.translations`,

  measures: {
    count: {
      type: `count`,
    },
  },

  dimensions: {
    translationId: {
      sql: `translation_id`,
      type: `number`,
      primaryKey: true,
    },
    translationKey: {
      sql: `translation_key`,
      type: `string`,
    },
    language: {
      sql: `language`,
      type: `string`,
    },
    text: {
      sql: `text`,
      type: `string`,
    },
  },
});
