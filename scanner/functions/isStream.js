function isStream(v) {
  return typeof v === "object" && v !== null && v.getBytes !== undefined;
}