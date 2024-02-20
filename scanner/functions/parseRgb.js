function parseRgb(string, obj) {
    var values = string.replace(/[^\d,.]/g, '');
    var rgba = values.split(',');

    rgba[0] = keepWithin(parseInt(rgba[0], 10), 0, 255);
    rgba[1] = keepWithin(parseInt(rgba[1], 10), 0, 255);
    rgba[2] = keepWithin(parseInt(rgba[2], 10), 0, 255);
    if(rgba[3] !== undefined) {
      rgba[3] = keepWithin(parseFloat(rgba[3], 10), 0, 1);
    }

    // Return RGBA object
    if( obj ) {
      if (rgba[3] !== undefined) {
        return {
          r: rgba[0],
          g: rgba[1],
          b: rgba[2],
          a: rgba[3]
        };
      } else {
        return {
          r: rgba[0],
          g: rgba[1],
          b: rgba[2]
        };
      }
    }

    // Return RGBA string
    if(typeof(rgba[3]) !== 'undefined' && rgba[3] <= 1) {
      return 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')';
    } else {
      return 'rgb(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ')';
    }

  }