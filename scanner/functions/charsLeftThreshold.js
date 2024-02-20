function charsLeftThreshold(input, threshold, maxlength) {
        var output = true;
        if (!options.alwaysShow && (maxlength - inputLength(input) > threshold)) {
          output = false;
        }
        return output;
      }