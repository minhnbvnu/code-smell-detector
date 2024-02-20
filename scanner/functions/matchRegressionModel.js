function matchRegressionModel(description) {
  const regModelMap = {
    poisson: ["count", "event"],
    ordinal: ["rank", "order"],
  };
  for (const [model, keywords] of Object.entries(regModelMap)) {
    for (const keyword of keywords) {
      if (description.includes(keyword)) {
        return model;
      }
    }
  }
  return null;
}