function logImageInBrowser2(_ref3) {
    let {
      image,
      message = "",
      scale: scale5 = 1
    } = _ref3;
    if (typeof image === "string") {
      const img = new Image();
      img.onload = () => {
        const args = formatImage2(img, message, scale5);
        console.log(...args);
      };
      img.src = image;
      return noop3;
    }
    const element = image.nodeName || "";
    if (element.toLowerCase() === "img") {
      console.log(...formatImage2(image, message, scale5));
      return noop3;
    }
    if (element.toLowerCase() === "canvas") {
      const img = new Image();
      img.onload = () => console.log(...formatImage2(img, message, scale5));
      img.src = image.toDataURL();
      return noop3;
    }
    return noop3;
  }