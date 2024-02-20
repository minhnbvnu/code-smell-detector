function isProblematicUnicodeLocation(code) {
    if (code <= 0x1F) { // Control chars
      return true;
    }
    if (code >= 0x80 && code <= 0x9F) { // Control chars
      return true;
    }
    if ((code >= 0x2000 && code <= 0x200F) || // General punctuation chars
        (code >= 0x2028 && code <= 0x202F) ||
        (code >= 0x2060 && code <= 0x206F)) {
      return true;
    }
    if (code >= 0xFFF0 && code <= 0xFFFF) { // Specials Unicode block
      return true;
    }
    switch (code) {
      case 0x7F: // Control char
      case 0xA0: // Non breaking space
      case 0xAD: // Soft hyphen
      case 0x0E33: // Thai character SARA AM
      case 0x2011: // Non breaking hyphen
      case 0x205F: // Medium mathematical space
      case 0x25CC: // Dotted circle (combining mark)
        return true;
    }
    return false;
  }