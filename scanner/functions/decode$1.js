function decode$1(mappings) {
    var decoded = [];
    var line = [];
    var segment = [
      0,
      0,
      0,
      0,
      0
    ];
    var j = 0;
    for (var i = 0, shift = 0, value = 0; i < mappings.length; i++) {
      var c2 = mappings.charCodeAt(i);
      if (c2 === 44) {
        segmentify(line, segment, j);
        j = 0;
      } else if (c2 === 59) {
        segmentify(line, segment, j);
        j = 0;
        decoded.push(line);
        line = [];
        segment[0] = 0;
      } else {
        var integer = charToInteger[c2];
        if (integer === void 0) {
          throw new Error("Invalid character (" + String.fromCharCode(c2) + ")");
        }
        var hasContinuationBit = integer & 32;
        integer &= 31;
        value += integer << shift;
        if (hasContinuationBit) {
          shift += 5;
        } else {
          var shouldNegate = value & 1;
          value >>>= 1;
          if (shouldNegate) {
            value = value === 0 ? -2147483648 : -value;
          }
          segment[j] += value;
          j++;
          value = shift = 0;
        }
      }
    }
    segmentify(line, segment, j);
    decoded.push(line);
    return decoded;
  }