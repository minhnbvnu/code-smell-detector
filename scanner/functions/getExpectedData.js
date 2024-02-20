function getExpectedData(options) {
  return {
    length: 10,
    sample_rate: 48000,
    samples_per_pixel: 512,
    duration: 0.10666666666666667, // 10 * 512 / 48000
    pixels_per_second: 0,
    byte_size: 40,
    resampled_length: 5,
    resampled_values: {
      channels: {
        0: {
          min: [-10, -5, -5, 0, -2],
          max: [10, 7, 7, 0, 2]
        },
        1: {
          min: [-8, -6, -6, 0, -3],
          max: [8, 3, 3, 0, 3]
        }
      }
    }
  };
}