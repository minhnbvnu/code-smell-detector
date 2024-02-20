function iterate_grams(value, gram_size = 2) {
    const simplified = "-" + value.toLowerCase().replace(non_word_regex, "") + "-";
    const len_diff = gram_size - simplified.length;
    const results = [];
    if (len_diff > 0) {
      for (let i = 0; i < len_diff; ++i) {
        value += "-";
      }
    }
    for (let i = 0; i < simplified.length - gram_size + 1; ++i) {
      results.push(simplified.slice(i, i + gram_size));
    }
    return results;
  }