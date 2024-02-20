function matchKey(key) {  //Maps a keyboard key to a gameboy key.
  //Order: Right, Left, Up, Down, A, B, Select, Start
  for (var index = 0; index < settings[3].length; index++) {
    if (settings[3][index] == key) {
      return index;
    }
  }
  return -1;
}