function UTF32ToString(ptr, maxBytesToRead) {
          var i = 0;
          var str = "";
          while (!(i >= maxBytesToRead / 4)) {
            var utf32 = HEAP32[ptr + i * 4 >>> 2];
            if (utf32 == 0)
              break;
            ++i;
            if (utf32 >= 65536) {
              var ch = utf32 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            } else {
              str += String.fromCharCode(utf32);
            }
          }
          return str;
        }