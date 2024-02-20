function color$2(aValue1, aValue2) {
      var a;
      if (aValue1 & 4278190080) {
        a = Math.round(255 * (aValue2 / colorModeA));
        a = a > 255 ? 255 : a;
        a = a < 0 ? 0 : a;
        return aValue1 - (aValue1 & 4278190080) + (a << 24 & 4278190080)
      }
      if (curColorMode === 1) return color$4(aValue1, aValue1, aValue1, aValue2);
      if (curColorMode === 3) return color$4(0, 0, aValue1 / colorModeX * colorModeZ, aValue2)
    }