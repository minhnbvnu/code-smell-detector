function toMultiArray(arr) {
        var inputLength = arr.length;
        var out = [];
        var index = 0;

        for (var i = 0; i < inputLength; i += 2) {
          out[index] = [arr[i], arr[i + 1]];
          ++index;
        }

        return out;
      }