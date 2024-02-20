function parseStreamVariableV1(objects, streamName, time) {
  if (Array.isArray(objects)) {
    return {time};
  }

  let variable;
  const {timestamps, values} = objects;
  if (values.length === 1) {
    variable = values[0];
  } else if (timestamps) {
    variable = values.map((v, i) => [timestamps[i], v]);
  } else {
    variable = values;
  }

  const entry = {
    time,
    variable
  };

  return entry;
}