function loadPrexistingExternalFiles(externalFileDict) {
  console.log("Loading Pre-Existing external files...");
  for (let key in externalFileDict) {
    if (key.includes(".stl")) {
        importSTL       (key, externalFileDict[key].content);
    } else {
        importSTEPorIGES(key, externalFileDict[key].content);
    }
  }
}