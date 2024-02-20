function buildAudio(ayahs) {
  if (!ayahs.length) {
    return false;
  }

  return ayahs.map(ayah => buildAudioForAyah(ayah));
}