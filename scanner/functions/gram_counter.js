function gram_counter(value, gram_size = 2) {
    const result = {};
    const grams = iterate_grams(value, gram_size);
    let i = 0;
    for (i; i < grams.length; ++i) {
      if (grams[i] in result) {
        result[grams[i]] += 1;
      } else {
        result[grams[i]] = 1;
      }
    }
    return result;
  }