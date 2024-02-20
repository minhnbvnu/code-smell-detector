function makeVariableFileNamesConsistent(flagsArray) {
  for (var i = 0; i < flagsArray.length; i++) {
    if (/splittable\.extern\.js$/.test(flagsArray[i])) {
      flagsArray[i] = '$splittable.extern.js';
    }
    if (/splittable-build\/tmp-/.test(flagsArray[i])) {
      flagsArray[i] = '$TMP_FILE';
    }
  }
  return flagsArray;
}