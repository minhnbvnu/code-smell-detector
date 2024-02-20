function tryDelete(word = '', index = 0, node = null) {
  if (word === undefined) {
    throw new Error('Bad Word');
  }
  if (index >= word.length) {
    throw new Error('Bad index to check for deletion.');
  }
  if (node === null) {
    throw new Error(`Bad Node at ${index} for ${word}`);
  }

  const currentNode = node;
  if (index === word.length - 1) {
    return delete currentNode[END_WORD_SYMBOL] && noKids(node);
  }
  const newIndex = word[index + 1];
  if (tryDelete(word, index + 1, node[newIndex])) {
    return delete currentNode[newIndex] && noKids(node);
  }
  return false;
}