function logImageInNode2(_ref2) {
    let {
      image,
      message = "",
      scale: scale5 = 1
    } = _ref2;
    let asciify = null;
    try {
      asciify = module.require("asciify-image");
    } catch (error) {
    }
    if (asciify) {
      return () => asciify(image, {
        fit: "box",
        width: "".concat(Math.round(80 * scale5), "%")
      }).then((data) => console.log(data));
    }
    return noop3;
  }