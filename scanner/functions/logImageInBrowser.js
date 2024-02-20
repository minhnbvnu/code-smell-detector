function logImageInBrowser({
    image,
    message = "",
    scale: scale5 = 1
  }) {
    if (typeof image === "string") {
      const img = new Image();
      img.onload = () => {
        const args = formatImage(img, message, scale5);
        console.log(...args);
      };
      img.src = image;
      return noop2;
    }
    const element = image.nodeName || "";
    if (element.toLowerCase() === "img") {
      console.log(...formatImage(image, message, scale5));
      return noop2;
    }
    if (element.toLowerCase() === "canvas") {
      const img = new Image();
      img.onload = () => console.log(...formatImage(img, message, scale5));
      img.src = image.toDataURL();
      return noop2;
    }
    return noop2;
  }