async function parseImage(arrayBuffer, options, context) {
    options = options || {};
    const imageOptions = options.image || {};
    const imageType = imageOptions.type || "auto";
    const { url } = context || {};
    const loadType = getLoadableImageType(imageType);
    let image;
    switch (loadType) {
      case "imagebitmap":
        image = await parseToImageBitmap(arrayBuffer, options, url);
        break;
      case "image":
        image = await parseToImage(arrayBuffer, options, url);
        break;
      case "data":
        image = await parseToNodeImage(arrayBuffer, options);
        break;
      default:
        assert2(false);
    }
    if (imageType === "data") {
      image = getImageData(image);
    }
    return image;
  }