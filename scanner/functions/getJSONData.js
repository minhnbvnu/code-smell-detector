function getJSONData(options) {
  if (!options) {
    options = {};
  }

  if (!("channels" in options)) {
    options.channels = 1;
  }

  if (!("bits" in options)) {
    options.bits = 8;
  }

  const data = {
    length: 10,
    bits: options.bits,
    sample_rate: 48000,
    samples_per_pixel: 512
  };

  if (options.channels === 1) {
    // Version 1 files don't include the version or channels fields
    // data.version = 1;
    // data.channels = 1;

    data.data = [
      0, 0,
      -10, 10,
      0, 0,
      -5, 7,
      -5, 7,
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      -2, 2
    ];
  }
  else {
    data.version = 2;
    data.channels = options.channels;

    data.data = [
      0, 0, 0, 0,
      -10, 10, -8, 8,
      0, 0, -2, 2,
      -5, 7, -6, 3,
      -5, 7, -6, 3,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      -2, 2, -3, 3
    ];
  }

  if ("version" in options) {
    data.version = options.version;
  }

  return data;
}