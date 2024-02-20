function buildAudioFromHash(ayahsObject = {}) {
  const audioFromHash = { files: {}, segments: {} };

  Object.keys(ayahsObject).forEach((ayahId) => {
    const ayah = ayahsObject[ayahId];
    const audioForAyah = buildAudioForAyah(ayah.audio);

    audioFromHash.files[ayahId] = audioForAyah.audio;
    audioFromHash.segments[ayahId] = audioForAyah.segments;
  });

  return audioFromHash;
}