function setColorAndStore(newColor) {
    setColor(newColor);
    window.localStorage.setItem("color-scheme", newColor);
  }