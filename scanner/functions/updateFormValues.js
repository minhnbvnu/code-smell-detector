function updateFormValues(data, oldValues, newValues) {
  const values = {...oldValues, ...newValues};
  for (const key in newValues) {
    if (data[key] && data[key].children) {
      // is parent, reset child values
      for (const streamName in data[key].children) {
        values[streamName] = newValues[key];
      }
    } else {
      // is leaf, re-evaluate parent value
      const parentKey = getParentKey(key);
      if (parentKey) {
        values[parentKey] = getParentValue(data[parentKey].children, values);
      }
    }
  }
  return values;
}