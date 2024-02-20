async function parseToImageBitmap(arrayBuffer, options, url) {
    let blob;
    if (isSVG(url)) {
      const image = await parseToImage(arrayBuffer, options, url);
      blob = image;
    } else {
      blob = getBlob(arrayBuffer, url);
    }
    const imagebitmapOptions = options && options.imagebitmap;
    return await safeCreateImageBitmap(blob, imagebitmapOptions);
  }