function convertRate(rate) {
    return Object.keys(rate.quotes).reduce((acc, pair) => {
      const code = pair.substr(3, 3);
      acc[code] = rate.quotes[pair];
      return acc;
    }, {});
  }