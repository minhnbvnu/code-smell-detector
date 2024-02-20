function normalizeFontWeight(weight) {
  if (!weight) {
    return 400;
  }

  if (typeof weight === "number") {
    // Ignore values which aren't valid font-weights.
    return weight >= 100 && weight <= 900 && weight % 100 === 0 ? weight : 400;
  }

  if (/^\d00$/.test(weight)) {
    return parseInt(weight);
  }

  switch (weight) {
    case "bold":
      return 700;

    case "normal":
    default:
      return 400;
  }
}