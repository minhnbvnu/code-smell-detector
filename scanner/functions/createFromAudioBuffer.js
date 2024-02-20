function createFromAudioBuffer(audio_buffer, options, callback) {
  var channels = getChannelData(audio_buffer);

  if (options.disable_worker) {
    var buffer = generateWaveformData({
      scale: options.scale,
      bits: options.bits,
      amplitude_scale: options.amplitude_scale,
      split_channels: options.split_channels,
      length: audio_buffer.length,
      sample_rate: audio_buffer.sampleRate,
      channels: channels
    });

    callback(null, new WaveformData(buffer), audio_buffer);
  }
  else {
    var worker = new WaveformDataWorker();

    worker.onmessage = function(evt) {
      callback(null, new WaveformData(evt.data), audio_buffer);
    };

    worker.postMessage({
      scale: options.scale,
      bits: options.bits,
      amplitude_scale: options.amplitude_scale,
      split_channels: options.split_channels,
      length: audio_buffer.length,
      sample_rate: audio_buffer.sampleRate,
      channels: channels
    }, channels);
  }
}