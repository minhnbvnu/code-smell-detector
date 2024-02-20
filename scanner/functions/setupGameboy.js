function setupGameboy() {

  // Check if all the types required by the code are supported.
  // If not, throw exception and quit.
  if (!(typeof Uint8Array != "undefined" &&
      typeof Int8Array != "undefined" &&
      typeof Float32Array != "undefined" &&
      typeof Int32Array != "undefined") ) {
    throw "TypedArrayUnsupported";
  }
  decoded_gameboy_rom = base64_decode(gameboy_rom);
  rom = null;
}