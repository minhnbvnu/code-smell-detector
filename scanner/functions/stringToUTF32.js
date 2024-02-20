function stringToUTF32(str, outPtr, maxBytesToWrite) {
          outPtr >>>= 0;
          if (maxBytesToWrite === void 0) {
            maxBytesToWrite = 2147483647;
          }
          if (maxBytesToWrite < 4)
            return 0;
          var startPtr = outPtr;
          var endPtr = startPtr + maxBytesToWrite - 4;
          for (var i = 0; i < str.length; ++i) {
            var codeUnit = str.charCodeAt(i);
            if (codeUnit >= 55296 && codeUnit <= 57343) {
              var trailSurrogate = str.charCodeAt(++i);
              codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
            }
            HEAP32[outPtr >>> 2] = codeUnit;
            outPtr += 4;
            if (outPtr + 4 > endPtr)
              break;
          }
          HEAP32[outPtr >>> 2] = 0;
          return outPtr - startPtr;
        }