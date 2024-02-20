function parseFontFamily(input) {
  var result = [];
  var ch, parsed;
  var remaining = input.trim();

  if (remaining === "") {
    return defaultFont;
  }

  if (remaining in systemFonts) {
    return [systemFonts[remaining]];
  }

  while (remaining !== "") {
    parsed = null;
    remaining = eatWhiteSpace(remaining);
    ch = remaining.charAt(0);

    switch (ch) {
      case '"':
      case "'":
        parsed = parseQuotedFontFamily(remaining.substring(1), ch);
        break;

      default:
        parsed = parseNonQuotedFontFamily(remaining);
        break;
    }

    if (parsed === null) {
      return defaultFont;
    }

    result.push(parsed[0]);

    remaining = eatWhiteSpace(parsed[1]);

    // We expect end of input or a comma separator here
    if (remaining !== "" && remaining.charAt(0) !== ",") {
      return defaultFont;
    }

    remaining = remaining.replace(/^,/, "");
  }

  return result;
}