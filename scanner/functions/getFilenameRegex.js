function getFilenameRegex(base, ext) {
  // Note: The four slashes: \\\\ ultimately represent a single escaped slash in
  // the regex ("\\"), however each itself needs to be escaped so that
  // JavaScript does not interperate it as an escape character in the string
  // literal. Wonderful.
  return new RegExp(`^(.*[/\\\\])?${base}.(${ext})$`, "i");
}