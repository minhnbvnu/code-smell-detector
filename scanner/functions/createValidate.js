function createValidate(schemaRoot) {
  return async function ({ ctx, schema, data, filterOptions }) {
    const validate = this.getSchema(schema || schemaRoot);
    try {
      const res = await validate.call(ctx, data);
      if (filterOptions) {
        _filterResult({ ajv: this, validate, data, filterOptions });
      }
      return res;
    } catch (e) {
      if (!Array.isArray(e.errors)) throw e;
      const locale = ctx.locale.split('-')[0];
      if (locale !== 'en' && AjvLocalize[locale]) AjvLocalize[locale](e.errors);
      // need not output error
      // ctx.logger.error(e);
      // error
      throw ctx.createError({
        ...e,
        code: 422,
        message: e.errors,
      });
    }
  };
}