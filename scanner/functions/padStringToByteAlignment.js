function padStringToByteAlignment(string, byteAlignment) {
    const length4 = string.length;
    const paddedLength = Math.ceil(length4 / byteAlignment) * byteAlignment;
    const padding = paddedLength - length4;
    let whitespace = "";
    for (let i2 = 0; i2 < padding; ++i2) {
      whitespace += " ";
    }
    return string + whitespace;
  }