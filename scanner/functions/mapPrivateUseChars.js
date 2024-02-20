function mapPrivateUseChars(code) {
  switch (code) {
    case 0xF8E9: // copyrightsans
    case 0xF6D9: // copyrightserif
      return 0x00A9; // copyright
    default:
      return code;
  }
}