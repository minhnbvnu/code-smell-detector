function sanitizeGlyph(source, sourceStart, sourceEnd, dest, destStart, hintsValid) {
        var glyphProfile = {
          length: 0,
          sizeOfInstructions: 0
        };

        if (sourceEnd - sourceStart <= 12) {
          return glyphProfile;
        }

        var glyf = source.subarray(sourceStart, sourceEnd);
        var contoursCount = signedInt16(glyf[0], glyf[1]);

        if (contoursCount < 0) {
          contoursCount = -1;
          writeSignedInt16(glyf, 0, contoursCount);
          dest.set(glyf, destStart);
          glyphProfile.length = glyf.length;
          return glyphProfile;
        }

        var i,
            j = 10,
            flagsCount = 0;

        for (i = 0; i < contoursCount; i++) {
          var endPoint = glyf[j] << 8 | glyf[j + 1];
          flagsCount = endPoint + 1;
          j += 2;
        }

        var instructionsStart = j;
        var instructionsLength = glyf[j] << 8 | glyf[j + 1];
        glyphProfile.sizeOfInstructions = instructionsLength;
        j += 2 + instructionsLength;
        var instructionsEnd = j;
        var coordinatesLength = 0;

        for (i = 0; i < flagsCount; i++) {
          var flag = glyf[j++];

          if (flag & 0xc0) {
            glyf[j - 1] = flag & 0x3f;
          }

          let xLength = 2;

          if (flag & 2) {
            xLength = 1;
          } else if (flag & 16) {
            xLength = 0;
          }

          let yLength = 2;

          if (flag & 4) {
            yLength = 1;
          } else if (flag & 32) {
            yLength = 0;
          }

          const xyLength = xLength + yLength;
          coordinatesLength += xyLength;

          if (flag & 8) {
            var repeat = glyf[j++];
            i += repeat;
            coordinatesLength += repeat * xyLength;
          }
        }

        if (coordinatesLength === 0) {
          return glyphProfile;
        }

        var glyphDataLength = j + coordinatesLength;

        if (glyphDataLength > glyf.length) {
          return glyphProfile;
        }

        if (!hintsValid && instructionsLength > 0) {
          dest.set(glyf.subarray(0, instructionsStart), destStart);
          dest.set([0, 0], destStart + instructionsStart);
          dest.set(glyf.subarray(instructionsEnd, glyphDataLength), destStart + instructionsStart + 2);
          glyphDataLength -= instructionsLength;

          if (glyf.length - glyphDataLength > 3) {
            glyphDataLength = glyphDataLength + 3 & ~3;
          }

          glyphProfile.length = glyphDataLength;
          return glyphProfile;
        }

        if (glyf.length - glyphDataLength > 3) {
          glyphDataLength = glyphDataLength + 3 & ~3;
          dest.set(glyf.subarray(0, glyphDataLength), destStart);
          glyphProfile.length = glyphDataLength;
          return glyphProfile;
        }

        dest.set(glyf, destStart);
        glyphProfile.length = glyf.length;
        return glyphProfile;
      }