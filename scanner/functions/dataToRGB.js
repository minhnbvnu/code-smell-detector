function dataToRGB(data, width, height) {
      var i = 0,
        length = width * height * 4,
        rgb = [];
      while (i < length) {
        rgb.push(data[i++]);
        rgb.push(data[i++]);
        rgb.push(data[i++]);
        i++;
      }
      return rgb;
    }