function createImageArg(image) {

  var imageType = '';
  var extension;

  image = image || DEFAULT_IMAGE;

  if (IS_MAC) {
    extension = path.extname(image).substr(1);

    if (extension === 'icns') {
      imageType = 'iconpath';
    } else if (/^[A-Z]/.test(image)) {
      imageType = 'appIcon';
    } else if (/^png|gif|jpe?g$/.test(extension)) {
      imageType = 'image';
    } else if (extension) {
      imageType = 'icon';
      image = extension;
    } else {
      imageType = 'icon';
    }

    return [
      '--' + imageType,
      image
    ];
  }

  if (IS_WINDOWS) {
    return [
      '/i:' + image
    ];
  }

  return [];
}