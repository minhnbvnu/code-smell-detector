function buildAudioForAyah(audio) {
  const scopedAudio = new Audio();
  let segments = null;

  scopedAudio.preload = 'none';

  if (audio.url) {
    scopedAudio.src = audio.url;
    segments = audio.segments;
    return { audio: scopedAudio, segments };
  }

  return { audio: scopedAudio, segments };
}