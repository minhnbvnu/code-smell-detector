function parseStreamVariableV2(objects, streamName, time) {
  if (Array.isArray(objects)) {
    return {time};
  }

  const variables = objects.variables;
  if (!variables || !Array.isArray(variables)) {
    return {};
  }

  const result = {time};

  result.variable = variables
    .map(entry => {
      const {base, values} = entry;

      const valueData = getVariableData(values);
      if (!valueData || !valueData.values) {
        return null;
      }

      if (base && base.object_id) {
        valueData.id = base.object_id;
      }

      return valueData;
    })
    .filter(Boolean);

  return result;
}