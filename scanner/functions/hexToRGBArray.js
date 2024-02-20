function hexToRGBArray (hex) {

      hex = hex.replace(/#/, '');

      // If the string is a shorthand three digit hex notation, normalize it to
      // the standard six digit notation
      if (hex.length === 3) {
        hex = hex.split('');
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      hexToRGBArray_returnArray[0] = hexToDec(hex.substr(0, 2));
      hexToRGBArray_returnArray[1] = hexToDec(hex.substr(2, 2));
      hexToRGBArray_returnArray[2] = hexToDec(hex.substr(4, 2));

      return hexToRGBArray_returnArray;
    }