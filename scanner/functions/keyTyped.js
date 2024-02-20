function keyTyped() {
  if (keyCode >= 32){
    myAnimatedText.addCharacters(key);
  }
}