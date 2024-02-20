function addColor(string, color, background) {
    if (!isBrowser4 && typeof string === "string") {
      if (color) {
        color = getColor(color);
        string = "[".concat(color, "m").concat(string, "[39m");
      }
      if (background) {
        color = getColor(background);
        string = "[".concat(background + 10, "m").concat(string, "[49m");
      }
    }
    return string;
  }