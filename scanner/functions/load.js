function load(image, src) {
  return new Promise((resolve, reject) => {
    function handleLoad() {
      unlisten();
      resolve(image);
    }
    function handleError() {
      unlisten();
      reject(new Error('Image load error'));
    }
    function unlisten() {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    }
    image.addEventListener('load', handleLoad);
    image.addEventListener('error', handleError);
    if (src) {
      image.src = src;
    }
  });
}