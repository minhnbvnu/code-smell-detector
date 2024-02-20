function XUserDefinedEncoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      if (inRange(code_point, 0xF780, 0xF7FF)) {
        return output_byte_stream.emit(code_point - 0xF780 + 0x80);
      }
      encoderError(code_point);
    };
  }