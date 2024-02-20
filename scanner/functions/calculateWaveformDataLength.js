function calculateWaveformDataLength(audio_sample_count, scale) {
  var data_length = Math.floor(audio_sample_count / scale);

  var samples_remaining = audio_sample_count - (data_length * scale);

  if (samples_remaining > 0) {
    data_length++;
  }

  return data_length;
}