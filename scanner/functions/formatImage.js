function formatImage(image, message, scale5, maxWidth = 600) {
    const imageUrl = image.src.replace(/\(/g, "%28").replace(/\)/g, "%29");
    if (image.width > maxWidth) {
      scale5 = Math.min(scale5, maxWidth / image.width);
    }
    const width = image.width * scale5;
    const height = image.height * scale5;
    const style = ["font-size:1px;", "padding:".concat(Math.floor(height / 2), "px ").concat(Math.floor(width / 2), "px;"), "line-height:".concat(height, "px;"), "background:url(".concat(imageUrl, ");"), "background-size:".concat(width, "px ").concat(height, "px;"), "color:transparent;"].join("");
    return ["".concat(message, " %c+"), style];
  }