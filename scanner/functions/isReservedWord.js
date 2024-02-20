function isReservedWord(word, inModule) {
  return inModule && word === "await" || word === "enum";
}