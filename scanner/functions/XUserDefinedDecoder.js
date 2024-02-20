function XUserDefinedDecoder(options) {
    var fatal = options.fatal;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte) {
        return EOF_code_point;
      }
      byte_pointer.offset(1);
      if (inRange(bite, 0x00, 0x7F)) {
        return bite;
      }
      return 0xF780 + bite - 0x80;
    };
  }