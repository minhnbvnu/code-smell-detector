function import_save(blobData) {
  blobData = decodeBlob(blobData);
  if (blobData && blobData.blobs) {
    if (blobData.blobs.length > 0) {
      for (var index = 0; index < blobData.blobs.length; ++index) {
        cout("Importing blob \"" + blobData.blobs[index].blobID + "\"", 0);
        if (blobData.blobs[index].blobContent) {
          if (blobData.blobs[index].blobID.substring(0, 5) == "SRAM_") {
            setValue("B64_" + blobData.blobs[index].blobID, base64(blobData.blobs[index].blobContent));
          }
          else {
            setValue(blobData.blobs[index].blobID, JSON.parse(blobData.blobs[index].blobContent));
          }
        }
        else if (blobData.blobs[index].blobID) {
          cout("Save file imported had blob \"" + blobData.blobs[index].blobID + "\" with no blob data interpretable.", 2);
        }
        else {
          cout("Blob chunk information missing completely.", 2);
        }
      }
    }
    else {
      cout("Could not decode the imported file.", 2);
    }
  }
  else {
    cout("Could not decode the imported file.", 2);
  }
}