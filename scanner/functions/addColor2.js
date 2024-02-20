function addColor2(string, color, background) {
    if (!isBrowser5 && typeof string === "string") {
      if (color) {
        color = getColor2(color);
        string = "[".concat(color, "m").concat(string, "[39m");
      }
      if (background) {
        color = getColor2(background);
        string = "[".concat(background + 10, "m").concat(string, "[49m");
      }
    }
    return string;
  }