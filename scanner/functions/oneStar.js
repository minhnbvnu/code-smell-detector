function oneStar(dotfile) {
  return dotfile ? '(?!' + dotfileGlob + ')(?=.)' + star : (nodot + star);
}