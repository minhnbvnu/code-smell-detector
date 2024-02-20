function hex2rgb(hex) {
    hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
    return {
      r: hex >> 16,
      g: (hex & 0x00FF00) >> 8,
      b: (hex & 0x0000FF)
    };
  }