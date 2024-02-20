function importSTEPorIGES(fileName, fileText) {
  // Writes the uploaded file to Emscripten's Virtual Filesystem
  oc.FS.createDataFile("/", fileName, fileText, true, true);

  // Choose the correct OpenCascade file parsers to read the CAD file
  var reader = null; let tempFilename = fileName.toLowerCase();
  if (tempFilename.endsWith(".step") || tempFilename.endsWith(".stp")) {
    reader = new oc.STEPControl_Reader();
  } else if (tempFilename.endsWith(".iges") || tempFilename.endsWith(".igs")) {
    reader = new oc.IGESControl_Reader();
  } else { console.error("opencascade.js can't parse this extension! (yet)"); }

  let readResult = reader.ReadFile(fileName);            // Read the file
  if (readResult === 1) {
    console.log(fileName + " loaded successfully!     Converting to OCC now...");
    reader.TransferRoots();                              // Translate all transferable roots to OpenCascade
    let stepShape           = reader.OneShape();         // Obtain the results of translation in one OCCT shape
    
    // Add to the externalShapes dictionary
    externalShapes[fileName] = new oc.TopoDS_Shape(stepShape);
    externalShapes[fileName].hash = stringToHash(fileName);
    console.log("Shape Import complete! Use sceneShapes.push(externalShapes['"+fileName+"']); to add it to the scene!");
    
    // Remove the file when we're done (otherwise we run into errors on reupload)
    oc.FS.unlink("/" + fileName);
    
    return externalShapes[fileName];
  } else {
    console.error("Something in OCCT went wrong trying to read " + fileName);
    return null;
  }
}