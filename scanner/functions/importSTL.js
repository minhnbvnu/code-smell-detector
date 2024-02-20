function importSTL(fileName, fileText) {
  // Writes the uploaded file to Emscripten's Virtual Filesystem
  oc.FS.createDataFile("/", fileName, fileText, true, true);

  // Choose the correct OpenCascade file parsers to read the STL file
  var reader    = new oc.StlAPI_Reader();
  let readShape = new oc.TopoDS_Shape ();

  if (reader.Read(readShape, fileName)) {
    console.log(fileName + " loaded successfully!     Converting to OCC now...");
    
    // Convert Shell to Solid as is expected
    let solidSTL = new oc.BRepBuilderAPI_MakeSolid();
    solidSTL.Add(new oc.TopoDS_Shape(readShape));

    // Add to the externalShapes dictionary
    externalShapes[fileName] = new oc.TopoDS_Shape(solidSTL.Solid());
    externalShapes[fileName].hash = stringToHash(fileName);
    console.log("Shape Import complete! Use sceneShapes.push(externalShapes['" + fileName + "']); to see it!");
    
    // Remove the file when we're done (otherwise we run into errors on reupload)
    oc.FS.unlink("/" + fileName);
    
    return externalShapes[fileName];
  } else {
    console.log("Something in OCCT went wrong trying to read " + fileName + ".  \n" +
      "Cascade Studio only imports small ASCII stl files for now!");
    return null;
  }
}