function parseJSONPath(path = "") {
  if (typeof path !== "string") {
    throw new Error("Path must be a string");
  }
  path = path.replace(/\[/g, ".");
  path = path.replace(/\]/g, "");
  return path.split(".").filter((part) => part !== "");
}