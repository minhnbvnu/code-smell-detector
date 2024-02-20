function getLineMapFromPatch(patchString) {
  var diffLineIndex = 0;
  var fileLineIndex = 0;
  var lineMap = {};

  patchString.split('\n').forEach((line) => {
    if (line.match(/^@@/)) {
      fileLineIndex = line.match(/\+([0-9]+)/)[1] - 1;
      return;
    }

    diffLineIndex++;
    if (line[0] !== '-') {
      fileLineIndex++;
      if (line[0] === '+') {
        lineMap[fileLineIndex] = diffLineIndex;
      }
    }
  });

  return lineMap;
}