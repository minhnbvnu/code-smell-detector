function convertJsonToBinary(data) {
  var waveformData = data.data;
  var channels = data.channels || 1;
  var header_size = 24; // version 2
  var bytes_per_sample = data.bits === 8 ? 1 : 2;
  var expected_length = data.length * 2 * channels;

  if (waveformData.length !== expected_length) {
    throw new Error("WaveformData.create(): Length mismatch in JSON waveform data");
  }

  var total_size = header_size + waveformData.length * bytes_per_sample;

  var array_buffer = new ArrayBuffer(total_size);
  var data_object = new DataView(array_buffer);

  data_object.setInt32(0, 2, true); // Version
  data_object.setUint32(4, data.bits === 8, true);
  data_object.setInt32(8, data.sample_rate, true);
  data_object.setInt32(12, data.samples_per_pixel, true);
  data_object.setInt32(16, data.length, true);
  data_object.setInt32(20, channels, true);

  var index = header_size;

  var i;

  if (data.bits === 8) {
    for (i = 0; i < waveformData.length; i++) {
      data_object.setInt8(index++, waveformData[i], true);
    }
  }
  else {
    for (i = 0; i < waveformData.length; i++) {
      data_object.setInt16(index, waveformData[i], true);

      index += 2;
    }
  }

  return array_buffer;
}