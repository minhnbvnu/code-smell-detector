function charType(code) {
    if (code <= 0xf7) { return lowTypes.charAt(code) }
    else if (0x590 <= code && code <= 0x5f4) { return "R" }
    else if (0x600 <= code && code <= 0x6f9) { return arabicTypes.charAt(code - 0x600) }
    else if (0x6ee <= code && code <= 0x8ac) { return "r" }
    else if (0x2000 <= code && code <= 0x200b) { return "w" }
    else if (code == 0x200c) { return "b" }
    else { return "L" }
  }