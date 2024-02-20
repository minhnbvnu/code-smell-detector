function enumToIntField(values, fieldName, jsonObject) {
  const originalValue = jsonObject[fieldName];

  if (originalValue !== undefined) {
    const newValue = values[originalValue];

    if (newValue === undefined) {
      const msg = `Error: field "${fieldName}" has unknown enum value "${originalValue}"`;
      throw new Error(msg);
    }

    jsonObject[fieldName] = newValue;
  }
}