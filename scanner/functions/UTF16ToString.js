function UTF16ToString(ptr, maxBytesToRead) {
          var endPtr = ptr;
          var idx = endPtr >> 1;
          var maxIdx = idx + maxBytesToRead / 2;
          while (!(idx >= maxIdx) && HEAPU16[idx >>> 0])
            ++idx;
          endPtr = idx << 1;
          if (endPtr - ptr > 32 && UTF16Decoder)
            return UTF16Decoder.decode(HEAPU8.subarray(ptr >>> 0, endPtr >>> 0));
          var str = "";
          for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
            var codeUnit = HEAP16[ptr + i * 2 >>> 1];
            if (codeUnit == 0)
              break;
            str += String.fromCharCode(codeUnit);
          }
          return str;
        }