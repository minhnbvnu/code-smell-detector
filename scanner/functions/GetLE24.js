function GetLE24(data, data_off) {
    return (
      ((data[data_off + 0] << 0) |
        (data[data_off + 1] << 8) |
        (data[data_off + 2] << 16)) >>>
      0
    );
  }