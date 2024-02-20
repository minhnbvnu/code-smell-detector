function applyStencilMask(buffer, inverseDecode) {
        var imgArrayPos = 0;
        var i, j, mask, buf;
        // removing making non-masked pixels transparent
        var bufferPos = 3; // alpha component offset
        for (i = 0; i < height; i++) {
          mask = 0;
          for (j = 0; j < width; j++) {
            if (!mask) {
              buf = imgArray[imgArrayPos++];
              mask = 128;
            }
            if (!(buf & mask) == inverseDecode) {
              buffer[bufferPos] = 0;
            }
            bufferPos += 4;
            mask >>= 1;
          }
        }
      }