function isSpecialUnicode(unicode) {
  return (unicode <= 0x1F || (unicode >= 127 && unicode < kSizeOfGlyphArea)) ||
    (unicode >= kCmapGlyphOffset &&
    unicode < kCmapGlyphOffset + kSizeOfGlyphArea);
}