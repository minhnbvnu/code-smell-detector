function d3_rgbNumber(value) {
    return d3_rgb(value >> 16, value >> 8 & 255, value & 255);
  }