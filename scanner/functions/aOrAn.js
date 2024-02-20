function aOrAn(value = "") {
  return ["a", "e", "i", "o", "u"].includes(value[0].toLowerCase())
    ? "an"
    : "a";
}