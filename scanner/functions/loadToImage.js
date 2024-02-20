async function loadToImage(url, options) {
    const image = new Image();
    image.src = url;
    if (options.image && options.image.decode && image.decode) {
      await image.decode();
      return image;
    }
    return await new Promise((resolve, reject) => {
      try {
        image.onload = () => resolve(image);
        image.onerror = (err) => reject(new Error(`Could not load image ${url}: ${err}`));
      } catch (error) {
        reject(error);
      }
    });
  }