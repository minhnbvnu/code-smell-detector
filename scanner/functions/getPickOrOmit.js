function getPickOrOmit(type) {
  return function pickOrOmit(...args) {
    // If they are picking/omitting an object or array field, we need to also include everything under it
    const newSchema = {};
    this._schemaKeys.forEach((key) => {
      // Pick/omit it if it IS in the array of keys they want OR if it
      // STARTS WITH something that is in the array plus a period
      const includeIt = args.some((wantedField) => key === wantedField || key.indexOf(`${wantedField}.`) === 0);

      if ((includeIt && type === 'pick') || (!includeIt && type === 'omit')) {
        newSchema[key] = this._schema[key];
      }
    });

    return this._copyWithSchema(newSchema);
  };
}