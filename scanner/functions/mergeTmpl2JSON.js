function mergeTmpl2JSON(from, to, data = {}) {
  const json = JSON.parse(readTmpl(from, data));
  mergeObj2JSON(json, to);
}