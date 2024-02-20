function nfCoreScalar(value, plus, minus, leftDigits, rightDigits, group) {
      var sign = value < 0 ? minus : plus;
      var autoDetectDecimals = rightDigits === 0;
      var rightDigitsOfDefault = rightDigits === undef || rightDigits < 0 ? 0 : rightDigits;
      var absValue = Math.abs(value);
      if (autoDetectDecimals) {
        rightDigitsOfDefault = 1;
        absValue *= 10;
        while (Math.abs(Math.round(absValue) - absValue) > 1.0E-6 && rightDigitsOfDefault < 7) {
          ++rightDigitsOfDefault;
          absValue *= 10
        }
      } else if (rightDigitsOfDefault !== 0) absValue *= Math.pow(10, rightDigitsOfDefault);
      var number, doubled = absValue * 2;
      if (Math.floor(absValue) === absValue) number = absValue;
      else if (Math.floor(doubled) === doubled) {
        var floored = Math.floor(absValue);
        number = floored + floored % 2
      } else number = Math.round(absValue);
      var buffer = "";
      var totalDigits = leftDigits + rightDigitsOfDefault;
      while (totalDigits > 0 || number > 0) {
        totalDigits--;
        buffer = "" + number % 10 + buffer;
        number = Math.floor(number / 10)
      }
      if (group !== undef) {
        var i = buffer.length - 3 - rightDigitsOfDefault;
        while (i > 0) {
          buffer = buffer.substring(0, i) + group + buffer.substring(i);
          i -= 3
        }
      }
      if (rightDigitsOfDefault > 0) return sign + buffer.substring(0, buffer.length - rightDigitsOfDefault) + "." + buffer.substring(buffer.length - rightDigitsOfDefault, buffer.length);
      return sign + buffer
    }