function dimmedColor(color, dimDelta) {
  return { ...color,
    l: color.l - dimDelta
  };
}