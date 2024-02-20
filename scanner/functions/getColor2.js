function getColor2(color) {
    return typeof color === "string" ? COLOR2[color.toUpperCase()] || COLOR2.WHITE : color;
  }