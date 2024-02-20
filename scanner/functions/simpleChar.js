function simpleChar(character) {
  return CHAR_TAB                  !== character &&
         CHAR_LINE_FEED            !== character &&
         CHAR_CARRIAGE_RETURN      !== character &&
         CHAR_COMMA                !== character &&
         CHAR_LEFT_SQUARE_BRACKET  !== character &&
         CHAR_RIGHT_SQUARE_BRACKET !== character &&
         CHAR_LEFT_CURLY_BRACKET   !== character &&
         CHAR_RIGHT_CURLY_BRACKET  !== character &&
         CHAR_SHARP                !== character &&
         CHAR_AMPERSAND            !== character &&
         CHAR_ASTERISK             !== character &&
         CHAR_EXCLAMATION          !== character &&
         CHAR_VERTICAL_LINE        !== character &&
         CHAR_GREATER_THAN         !== character &&
         CHAR_SINGLE_QUOTE         !== character &&
         CHAR_DOUBLE_QUOTE         !== character &&
         CHAR_PERCENT              !== character &&
         CHAR_COLON                !== character &&
         !ESCAPE_SEQUENCES[character]            &&
         !needsHexEscape(character);
}