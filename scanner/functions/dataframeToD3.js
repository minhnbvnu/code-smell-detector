function dataframeToD3(df) {
  var names = [];
  var length = void 0;
  for (var name in df) {
    if (df.hasOwnProperty(name)) names.push(name);
    if (_typeof(df[name]) !== "object" || typeof df[name].length === "undefined") {
      throw new Error("All fields must be arrays");
    } else if (typeof length !== "undefined" && length !== df[name].length) {
      throw new Error("All fields must be arrays of the same length");
    }
    length = df[name].length;
  }
  var results = [];
  var item = void 0;
  for (var row = 0; row < length; row++) {
    item = {};
    for (var col = 0; col < names.length; col++) {
      item[names[col]] = df[names[col]][row];
    }
    results.push(item);
  }
  return results;
}