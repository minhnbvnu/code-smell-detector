function getColorIndex(color) {

      var hash = color.r.toString() + color.g.toString() + color.b.toString();

      if (colorsHash[hash] !== undefined) {

        return colorsHash[hash];

      }

      colorsHash[hash] = colors.length;
      colors.push(color.getHex());

      return colorsHash[hash];

    }