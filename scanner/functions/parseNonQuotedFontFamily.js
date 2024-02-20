function parseNonQuotedFontFamily(input) {
  // It implements part of the identifier parser here: https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  //
  // NOTE: This parser pretty much ignores escaped identifiers and that there is a thing called unicode.
  //
  // Breakdown of regexp:
  // -[a-z_]     - when identifier starts with a hyphen, you're not allowed to have another hyphen or a digit
  // [a-z_]      - allow a-z and underscore at beginning of input
  // [a-z0-9_-]* - after that, anything goes
  var match = input.match(/^(-[a-z_]|[a-z_])[a-z0-9_-]*/i);

  // non quoted value contains illegal characters
  if (match === null) {
    return null;
  }

  return [match[0], input.substring(match[0].length)];
}