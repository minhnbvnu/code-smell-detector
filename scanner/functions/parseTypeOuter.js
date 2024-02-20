function parseTypeOuter(scope, str, pos) {
    pos = skipSpace(str, pos || 0);
    if (str.charAt(pos) != "{") return null;
    var result = parseType(scope, str, pos + 1);
    if (!result) return null;
    var end = skipSpace(str, result.end);
    if (str.charAt(end) != "}") return null;
    result.end = end + 1;
    return result;
  }