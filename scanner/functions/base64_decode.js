function base64_decode(data) {
  try {
    // The following line was modified for benchmarking:
    var decode64 = GameBoyWindow.atob(data);  //Use this native function when it's available, as it's a magnitude faster than the non-native code below.
  }
  catch (error) {
    //Defaulting to non-native base64 decoding...
    var decode64 = "";
    var dataLength = data.length;
    if (dataLength > 3 && dataLength % 4 == 0) {
      var sixbits = [0, 0, 0, 0];  //Declare this out of the loop, to speed up the ops.
      var index = 0;
      while (index < dataLength) {
        //Keep this loop small for speed.
        sixbits = [fromBase64.indexOf(data.charAt(index++)), fromBase64.indexOf(data.charAt(index++)), fromBase64.indexOf(data.charAt(index++)), fromBase64.indexOf(data.charAt(index++))];
        decode64 += String.fromCharCode((sixbits[0] << 2) | (sixbits[1] >> 4)) + String.fromCharCode(((sixbits[1] & 0x0F) << 4) | (sixbits[2] >> 2)) + String.fromCharCode(((sixbits[2] & 0x03) << 6) | sixbits[3]);
      }
      //Check for the '=' character after the loop, so we don't hose it up.
      if (sixbits[3] >= 0x40) {
        decode64.length -= 1;
        if (sixbits[2] >= 0x40) {
          decode64.length -= 1;
        }
      }
    }
  }
  return decode64;
}