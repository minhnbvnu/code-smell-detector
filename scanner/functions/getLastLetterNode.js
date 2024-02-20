function getLastLetterNode(head, word, isAdd = false) {
  let current = head;

  // walk through word
  for (let i = 0; i < word.length; i++) {
    // could not find
    if (!(word[i] in current)) {
      if (isAdd) {
        // create
        current[word[i]] = {};
      } else {
        // found a substring
        return {
          value: current[END_WORD_SYMBOL],
          word: word.substring(0, i),
          isSubstring: true,
        };
      }
    }
    // keep traversing
    current = current[word[i]];
  }

  if (isAdd) {
    return current;
  }

  // found the word
  return {
    value: current[END_WORD_SYMBOL],
    word,
    isSubstring: false,
  };
}