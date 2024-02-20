function extractImagesUrl(image_data) {
    if (image_data !== undefined && image_data.innerHTML.indexOf('data-image') >= 0) {
      var data_src = image_data.innerHTML.match(/data-image=\"([^"]+)\"/ig);
      for (var i = 0; i < data_src.length; i++) {
        data_src[i] = data_src[i].match(/data-image=\"([^"]+)\"/i)[1];
        data_src[i] = decodeURIComponent(data_src[i]) + '.jpg';
      }
      return data_src;
    }
  }