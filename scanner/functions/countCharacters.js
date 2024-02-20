function countCharacters() {
  for (var i = 0; i < joinedText.length; i++) {
    // get one character from the text and turn it to uppercase
    var index = charSet.indexOf(joinedText.charAt(i).toUpperCase());
    // increacre the respective counter
    if (index >= 0) counters[index]++;
  }
}