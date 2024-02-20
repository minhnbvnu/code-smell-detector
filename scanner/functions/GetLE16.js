function GetLE16(data, data_off) {
    return (data[data_off + 0] << 0) | (data[data_off + 1] << 8);
  }