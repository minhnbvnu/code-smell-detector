function colorToHSB(colorInt) {
      var red, green, blue;
      red = ((colorInt >> 16) & 255) / 255;
      green = ((colorInt >> 8) & 255) / 255;
      blue = (colorInt & 255) / 255;
      var max = p.max(p.max(red, green), blue),
        min = p.min(p.min(red, green), blue),
        hue, saturation;
      if (min === max) return [0, 0, max * colorModeZ];
      saturation = (max - min) / max;
      if (red === max) hue = (green - blue) / (max - min);
      else if (green === max) hue = 2 + (blue - red) / (max - min);
      else hue = 4 + (red - green) / (max - min);
      hue /= 6;
      if (hue < 0) hue += 1;
      else if (hue > 1) hue -= 1;
      return [hue * colorModeX, saturation * colorModeY, max * colorModeZ]
    }