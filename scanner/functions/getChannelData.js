function getChannelData(audio_buffer) {
  var channels = [];

  for (var i = 0; i < audio_buffer.numberOfChannels; ++i) {
    channels.push(audio_buffer.getChannelData(i).buffer);
  }

  return channels;
}