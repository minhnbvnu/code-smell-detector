function saveShapeSTEP (filename = "CascadeStudioPart.step") {
  let writer = new oc.STEPControl_Writer();
  // Convert to a .STEP File
  let transferResult = writer.Transfer(currentShape, 0);
  if (transferResult === 1) {
    // Write the STEP File to the virtual Emscripten Filesystem Temporarily
    let writeResult = writer.Write(filename);
    if (writeResult === 1) {
      // Read the STEP File from the filesystem and clean up
      let stepFileText = oc.FS.readFile("/" + filename, { encoding:"utf8" });
      oc.FS.unlink("/" + filename);

      // Return the contents of the STEP File
      return stepFileText;
    }else{
      console.error("WRITE STEP FILE FAILED.");
    }
  }else{
    console.error("TRANSFER TO STEP WRITER FAILED.");
  }
}