function generateBlob(keyName, encodedData) {
  //Append the file format prefix:
  var saveString = "EMULATOR_DATA";
  var consoleID = "GameBoy";
  //Figure out the length:
  var totalLength = (saveString.length + 4 + (1 + consoleID.length)) + ((1 + keyName.length) + (4 + encodedData.length));
  //Append the total length in bytes:
  saveString += to_little_endian_dword(totalLength);
  //Append the console ID text's length:
  saveString += to_byte(consoleID.length);
  //Append the console ID text:
  saveString += consoleID;
  //Append the blob ID:
  saveString += to_byte(keyName.length);
  saveString += keyName;
  //Now append the save data:
  saveString += to_little_endian_dword(encodedData.length);
  saveString += encodedData;
  return saveString;
}