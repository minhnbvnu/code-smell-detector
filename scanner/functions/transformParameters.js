function transformParameters(parameters) {
  return parameters.reduce((acc, cur, idx) => {
    const parseKey = `Parameters.${idx + 1}.ParameterKey`;
    const parseValue = `Parameters.${idx + 1}.ParameterValue`;

    acc[parseKey] = cur.ParameterKey;
    acc[parseValue] = cur.ParameterValue;
    return acc;
  }, {});
}