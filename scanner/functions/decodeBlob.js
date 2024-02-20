function decodeBlob(blobData) {
  /*Format is as follows:
    - 13 byte string "EMULATOR_DATA"
    - 4 byte total size (including these 4 bytes).
    - 1 byte Console type ID length
    - Console type ID text of 8 bit size
    blobs {
      - 1 byte blob ID length
      - blob ID text (Used to say what the data is (SRAM/freeze state/etc...))
      - 4 byte blob length
      - blob length of 32 bit size
    }
  */
  var length = blobData.length;
  var blobProperties = {};
  blobProperties.consoleID = null;
  var blobsCount = -1;
  blobProperties.blobs = [];
  if (length > 17) {
    if (blobData.substring(0, 13) == "EMULATOR_DATA") {
      var length = Math.min(((blobData.charCodeAt(16) & 0xFF) << 24) | ((blobData.charCodeAt(15) & 0xFF) << 16) | ((blobData.charCodeAt(14) & 0xFF) << 8) | (blobData.charCodeAt(13) & 0xFF), length);
      var consoleIDLength = blobData.charCodeAt(17) & 0xFF;
      if (length > 17 + consoleIDLength) {
        blobProperties.consoleID = blobData.substring(18, 18 + consoleIDLength);
        var blobIDLength = 0;
        var blobLength = 0;
        for (var index = 18 + consoleIDLength; index < length;) {
          blobIDLength = blobData.charCodeAt(index++) & 0xFF;
          if (index + blobIDLength < length) {
            blobProperties.blobs[++blobsCount] = {};
            blobProperties.blobs[blobsCount].blobID = blobData.substring(index, index + blobIDLength);
            index += blobIDLength;
            if (index + 4 < length) {
              blobLength = ((blobData.charCodeAt(index + 3) & 0xFF) << 24) | ((blobData.charCodeAt(index + 2) & 0xFF) << 16) | ((blobData.charCodeAt(index + 1) & 0xFF) << 8) | (blobData.charCodeAt(index) & 0xFF);
              index += 4;
              if (index + blobLength <= length) {
                blobProperties.blobs[blobsCount].blobContent =  blobData.substring(index, index + blobLength);
                index += blobLength;
              }
              else {
                cout("Blob length check failed, blob determined to be incomplete.", 2);
                break;
              }
            }
            else {
              cout("Blob was incomplete, bailing out.", 2);
              break;
            }
          }
          else {
            cout("Blob was incomplete, bailing out.", 2);
            break;
          }
        }
      }
    }
  }
  return blobProperties;
}