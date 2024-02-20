function generateFlashStereoString() {  //Convert the arrays to one long string for speed.
  var copyBinaryStringLeft = "";
  var copyBinaryStringRight = "";
  for (var index = 0; index < samplesPerCallback && resampleBufferStart != resampleBufferEnd; ++index) {
    //Sanitize the buffer:
    copyBinaryStringLeft += String.fromCharCode(((Math.min(Math.max(resampled[resampleBufferStart++] + 1, 0), 2) * 0x3FFF) | 0) + 0x3000);
    copyBinaryStringRight += String.fromCharCode(((Math.min(Math.max(resampled[resampleBufferStart++] + 1, 0), 2) * 0x3FFF) | 0) + 0x3000);
    if (resampleBufferStart == resampleBufferSize) {
      resampleBufferStart = 0;
    }
  }
  return copyBinaryStringLeft + copyBinaryStringRight;
}