function getRateForPair(baseRate, pair) {
    if (pair.length != 6) {
      throw new Error(
        `Invalid pair "${pair}". Must be 6-char string, e.g. "USDEUR"`
      );
    }

    const source = pair.substr(0, 3);
    const target = pair.substr(3, 3);

    if (!baseRate[source]) throw new Error(`Unknown currency code "${source}"`);
    if (!baseRate[target]) throw new Error(`Unknown currency code "${target}"`);

    return {
      id: pair,
      rate: Number(
        source === BASE
          ? baseRate[target]
          : (1 / baseRate[source]) * baseRate[target]
      ).toFixed(6)
    };
  }