function getBinaryData(options) {
  if (!options) {
    options = {};
  }

  if (!("channels" in options)) {
    options.channels = 1;
  }

  if (!("bits" in options)) {
    options.bits = 8;
  }

  const data = getJSONData(options);

  let version;

  if ("version" in options) {
    version = options.version;
  }
  else {
    version = options.channels === 1 ? 1 : 2;
  }

  const headerSize = version === 2 ? 24 : 20;

  const dataLength = data.bits === 8 ? headerSize + data.data.length
                                     : headerSize + data.data.length * 2;

  const view = new DataView(new ArrayBuffer(dataLength));

  view.setInt32(0, version, true);
  view.setUint32(4, data.bits === 8 ? 1 : 0, true);
  view.setInt32(8, data.sample_rate, true);
  view.setInt32(12, data.samples_per_pixel, true);
  view.setUint32(16, data.data.length / (2 * options.channels), true);

  if (version === 2) {
    view.setInt32(20, options.channels, true);
  }

  if (data.bits === 8) {
    data.data.forEach(function(value, index) {
      view.setInt8(headerSize + index, value);
    });
  }
  else {
    data.data.forEach(function(value, index) {
      view.setInt16(headerSize + index * 2, value, true);
    });
  }

  return view.buffer;
}