function getMatchingExamples(text) {
    text = text.trim();
    if (text.length === 0) {
      return info.examples;
    }
    const words = text.toLowerCase().split(/\W+/);
    const scores = {};
    const updateScores = function (dict, word) {
      // eslint-disable-next-line prefer-const
      for (let exIndex in dict) {
        let exScore = scores[exIndex];
        if (!exScore) {
          exScore = {};
          scores[exIndex] = exScore;
        }
        exScore[word] = (exScore[word] || 0) + dict[exIndex];
      }
    };
    words.forEach(function (word) {
      const dict = info.wordIndex[word];
      if (dict) {
        updateScores(dict, word);
      } else {
        const r = new RegExp(word);
        // eslint-disable-next-line prefer-const
        for (let idx in info.wordIndex) {
          if (r.test(idx)) {
            updateScores(info.wordIndex[idx], word);
          }
        }
      }
    });
    const examples = [];
    // eslint-disable-next-line prefer-const
    for (let exIndex in scores) {
      const ex = info.examples[exIndex];
      ex.score = 0;
      ex.words = 0;
      // eslint-disable-next-line prefer-const
      for (let word in scores[exIndex]) {
        ex.score += scores[exIndex][word];
        ex.words++;
      }
      examples.push(ex);
    }
    // sort examples, first by number of words matched, then
    // by word frequency
    examples.sort(function (a, b) {
      return b.score - a.score || b.words - a.words;
    });
    return examples;
  }