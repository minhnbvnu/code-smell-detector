function padLeft(input, padding, length) {
        var result = input;

        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }

        return result;
      }