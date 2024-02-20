function getUshort(data, offset) {
    return (data[offset] << 8) | data[offset + 1];
  }