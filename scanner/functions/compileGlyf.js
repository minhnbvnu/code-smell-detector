function compileGlyf(code, cmds, font) {
    function moveTo(x, y) {
      cmds.push({
        cmd: "moveTo",
        args: [x, y]
      });
    }

    function lineTo(x, y) {
      cmds.push({
        cmd: "lineTo",
        args: [x, y]
      });
    }

    function quadraticCurveTo(xa, ya, x, y) {
      cmds.push({
        cmd: "quadraticCurveTo",
        args: [xa, ya, x, y]
      });
    }

    let i = 0;
    const numberOfContours = (code[i] << 24 | code[i + 1] << 16) >> 16;
    let flags;
    let x = 0,
        y = 0;
    i += 10;

    if (numberOfContours < 0) {
      do {
        flags = code[i] << 8 | code[i + 1];
        const glyphIndex = code[i + 2] << 8 | code[i + 3];
        i += 4;
        let arg1, arg2;

        if (flags & 0x01) {
          arg1 = (code[i] << 24 | code[i + 1] << 16) >> 16;
          arg2 = (code[i + 2] << 24 | code[i + 3] << 16) >> 16;
          i += 4;
        } else {
          arg1 = code[i++];
          arg2 = code[i++];
        }

        if (flags & 0x02) {
          x = arg1;
          y = arg2;
        } else {
          x = 0;
          y = 0;
        }

        let scaleX = 1,
            scaleY = 1,
            scale01 = 0,
            scale10 = 0;

        if (flags & 0x08) {
          scaleX = scaleY = (code[i] << 24 | code[i + 1] << 16) / 1073741824;
          i += 2;
        } else if (flags & 0x40) {
          scaleX = (code[i] << 24 | code[i + 1] << 16) / 1073741824;
          scaleY = (code[i + 2] << 24 | code[i + 3] << 16) / 1073741824;
          i += 4;
        } else if (flags & 0x80) {
          scaleX = (code[i] << 24 | code[i + 1] << 16) / 1073741824;
          scale01 = (code[i + 2] << 24 | code[i + 3] << 16) / 1073741824;
          scale10 = (code[i + 4] << 24 | code[i + 5] << 16) / 1073741824;
          scaleY = (code[i + 6] << 24 | code[i + 7] << 16) / 1073741824;
          i += 8;
        }

        const subglyph = font.glyphs[glyphIndex];

        if (subglyph) {
          cmds.push({
            cmd: "save"
          });
          cmds.push({
            cmd: "transform",
            args: [scaleX, scale01, scale10, scaleY, x, y]
          });
          compileGlyf(subglyph, cmds, font);
          cmds.push({
            cmd: "restore"
          });
        }
      } while (flags & 0x20);
    } else {
      const endPtsOfContours = [];
      let j, jj;

      for (j = 0; j < numberOfContours; j++) {
        endPtsOfContours.push(code[i] << 8 | code[i + 1]);
        i += 2;
      }

      const instructionLength = code[i] << 8 | code[i + 1];
      i += 2 + instructionLength;
      const numberOfPoints = endPtsOfContours[endPtsOfContours.length - 1] + 1;
      const points = [];

      while (points.length < numberOfPoints) {
        flags = code[i++];
        let repeat = 1;

        if (flags & 0x08) {
          repeat += code[i++];
        }

        while (repeat-- > 0) {
          points.push({
            flags
          });
        }
      }

      for (j = 0; j < numberOfPoints; j++) {
        switch (points[j].flags & 0x12) {
          case 0x00:
            x += (code[i] << 24 | code[i + 1] << 16) >> 16;
            i += 2;
            break;

          case 0x02:
            x -= code[i++];
            break;

          case 0x12:
            x += code[i++];
            break;
        }

        points[j].x = x;
      }

      for (j = 0; j < numberOfPoints; j++) {
        switch (points[j].flags & 0x24) {
          case 0x00:
            y += (code[i] << 24 | code[i + 1] << 16) >> 16;
            i += 2;
            break;

          case 0x04:
            y -= code[i++];
            break;

          case 0x24:
            y += code[i++];
            break;
        }

        points[j].y = y;
      }

      let startPoint = 0;

      for (i = 0; i < numberOfContours; i++) {
        const endPoint = endPtsOfContours[i];
        const contour = points.slice(startPoint, endPoint + 1);

        if (contour[0].flags & 1) {
          contour.push(contour[0]);
        } else if (contour[contour.length - 1].flags & 1) {
          contour.unshift(contour[contour.length - 1]);
        } else {
          const p = {
            flags: 1,
            x: (contour[0].x + contour[contour.length - 1].x) / 2,
            y: (contour[0].y + contour[contour.length - 1].y) / 2
          };
          contour.unshift(p);
          contour.push(p);
        }

        moveTo(contour[0].x, contour[0].y);

        for (j = 1, jj = contour.length; j < jj; j++) {
          if (contour[j].flags & 1) {
            lineTo(contour[j].x, contour[j].y);
          } else if (contour[j + 1].flags & 1) {
            quadraticCurveTo(contour[j].x, contour[j].y, contour[j + 1].x, contour[j + 1].y);
            j++;
          } else {
            quadraticCurveTo(contour[j].x, contour[j].y, (contour[j].x + contour[j + 1].x) / 2, (contour[j].y + contour[j + 1].y) / 2);
          }
        }

        startPoint = endPoint + 1;
      }
    }
  }