function getCanPlay(audio) {
  return {
    wav: audio.canPlayType('audio/wav; codecs="1"'),
    mp3: audio.canPlayType('audio/mpeg;'),
    ogg: audio.canPlayType('audio/ogg; codecs="vorbis"'),
    aac: audio.canPlayType('audio/aac;')
  };
}