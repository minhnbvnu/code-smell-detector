function translateMIDI(note) {
  return pow(2, ((note - 69) / 12.0)) * 440;
}