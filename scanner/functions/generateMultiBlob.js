function generateMultiBlob(blobPairs) {
  var consoleID = "GameBoy";
  //Figure out the initial length:
  var totalLength = 13 + 4 + 1 + consoleID.length;
  //Append the console ID text's length:
  var saveString = to_byte(consoleID.length);
  //Append the console ID text:
  saveString += consoleID;
  var keyName = "";
  var encodedData = "";
  //Now append all the blobs:
  for (var index = 0; index < blobPairs.length; ++index) {
    keyName = blobPairs[index][0];
    encodedData = blobPairs[index][1];
    //Append the blob ID:
    saveString += to_byte(keyName.length);
    saveString += keyName;
    //Now append the save data:
    saveString += to_little_endian_dword(encodedData.length);
    saveString += encodedData;
    //Update the total length:
    totalLength += 1 + keyName.length + 4 + encodedData.length;
  }
  //Now add the prefix:
  saveString = "EMULATOR_DATA" + to_little_endian_dword(totalLength) + saveString;
  return saveString;
}