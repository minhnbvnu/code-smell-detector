function heap32VectorToArray(count, firstElement) {
          var array = [];
          for (var i = 0; i < count; i++) {
            array.push(HEAPU32[firstElement + i * 4 >>> 2]);
          }
          return array;
        }