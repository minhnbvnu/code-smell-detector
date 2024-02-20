function isStrictBindOnlyReservedWord(word) {
  return reservedWordsStrictBindSet.has(word);
}