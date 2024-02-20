function setAutoValues(autoValueFunctions, mongoObject, isModifier, isUpsert, extendedAutoValueContext) {
  const sortedAutoValueFunctions = sortAutoValueFunctions(autoValueFunctions);

  sortedAutoValueFunctions.forEach(({ func, fieldName, closestSubschemaFieldName }) => {
    const avRunner = new AutoValueRunner({
      closestSubschemaFieldName,
      extendedAutoValueContext,
      func,
      isModifier,
      isUpsert,
      mongoObject,
    });

    const positions = getPositionsForAutoValue({ fieldName, isModifier, mongoObject });

    // Run the autoValue function once for each place in the object that
    // has a value or that potentially should.
    positions.forEach(avRunner.runForPosition.bind(avRunner));
  });
}