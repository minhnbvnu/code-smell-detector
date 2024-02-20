function formatStringCasing(str, casing, defaultCase) {
  if (typeof str !== "string") {
    return str;
  }
  let strCase = defaultCase;
  if (v.isStringHasLength(casing) && typeof t.KeyCasing[casing] === "string") {
    strCase =
      t.KeyCasing.default === casing ? defaultCase : t.KeyCasing[casing];
  }
  switch (strCase) {
    case t.KeyCasing.upper:
      return str.toUpperCase();
    case t.KeyCasing.none:
      return str;
    case t.KeyCasing.lower:
      return str.toLowerCase();
    case t.KeyCasing.default:
    default:
      return str;
  }
}