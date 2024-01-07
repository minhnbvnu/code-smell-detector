function compileCharString(charStringCode, cmds, font, glyphId) {
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

    function bezierCurveTo(x1, y1, x2, y2, x, y) {
      cmds.push({
        cmd: "bezierCurveTo",
        args: [x1, y1, x2, y2, x, y]
      });
    }

    const stack = [];
    let x = 0,
        y = 0;
    let stems = 0;

    function parse(code) {
      let i = 0;

      while (i < code.length) {
        let stackClean = false;
        let v = code[i++];
        let xa, xb, ya, yb, y1, y2, y3, n, subrCode;

        switch (v) {
          case 1:
            stems += stack.length >> 1;
            stackClean = true;
            break;

          case 3:
            stems += stack.length >> 1;
            stackClean = true;
            break;

          case 4:
            y += stack.pop();
            moveTo(x, y);
            stackClean = true;
            break;

          case 5:
            while (stack.length > 0) {
              x += stack.shift();
              y += stack.shift();
              lineTo(x, y);
            }

            break;

          case 6:
            while (stack.length > 0) {
              x += stack.shift();
              lineTo(x, y);

              if (stack.length === 0) {
                break;
              }

              y += stack.shift();
              lineTo(x, y);
            }

            break;

          case 7:
            while (stack.length > 0) {
              y += stack.shift();
              lineTo(x, y);

              if (stack.length === 0) {
                break;
              }

              x += stack.shift();
              lineTo(x, y);
            }

            break;

          case 8:
            while (stack.length > 0) {
              xa = x + stack.shift();
              ya = y + stack.shift();
              xb = xa + stack.shift();
              yb = ya + stack.shift();
              x = xb + stack.shift();
              y = yb + stack.shift();
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }

            break;

          case 10:
            n = stack.pop();
            subrCode = null;

            if (font.isCFFCIDFont) {
              const fdIndex = font.fdSelect.getFDIndex(glyphId);

              if (fdIndex >= 0 && fdIndex < font.fdArray.length) {
                const fontDict = font.fdArray[fdIndex];
                let subrs;

                if (fontDict.privateDict && fontDict.privateDict.subrsIndex) {
                  subrs = fontDict.privateDict.subrsIndex.objects;
                }

                if (subrs) {
                  n += getSubroutineBias(subrs);
                  subrCode = subrs[n];
                }
              } else {
                (0, _util.warn)("Invalid fd index for glyph index.");
              }
            } else {
              subrCode = font.subrs[n + font.subrsBias];
            }

            if (subrCode) {
              parse(subrCode);
            }

            break;

          case 11:
            return;

          case 12:
            v = code[i++];

            switch (v) {
              case 34:
                xa = x + stack.shift();
                xb = xa + stack.shift();
                y1 = y + stack.shift();
                x = xb + stack.shift();
                bezierCurveTo(xa, y, xb, y1, x, y1);
                xa = x + stack.shift();
                xb = xa + stack.shift();
                x = xb + stack.shift();
                bezierCurveTo(xa, y1, xb, y, x, y);
                break;

              case 35:
                xa = x + stack.shift();
                ya = y + stack.shift();
                xb = xa + stack.shift();
                yb = ya + stack.shift();
                x = xb + stack.shift();
                y = yb + stack.shift();
                bezierCurveTo(xa, ya, xb, yb, x, y);
                xa = x + stack.shift();
                ya = y + stack.shift();
                xb = xa + stack.shift();
                yb = ya + stack.shift();
                x = xb + stack.shift();
                y = yb + stack.shift();
                bezierCurveTo(xa, ya, xb, yb, x, y);
                stack.pop();
                break;

              case 36:
                xa = x + stack.shift();
                y1 = y + stack.shift();
                xb = xa + stack.shift();
                y2 = y1 + stack.shift();
                x = xb + stack.shift();
                bezierCurveTo(xa, y1, xb, y2, x, y2);
                xa = x + stack.shift();
                xb = xa + stack.shift();
                y3 = y2 + stack.shift();
                x = xb + stack.shift();
                bezierCurveTo(xa, y2, xb, y3, x, y);
                break;

              case 37:
                const x0 = x,
                      y0 = y;
                xa = x + stack.shift();
                ya = y + stack.shift();
                xb = xa + stack.shift();
                yb = ya + stack.shift();
                x = xb + stack.shift();
                y = yb + stack.shift();
                bezierCurveTo(xa, ya, xb, yb, x, y);
                xa = x + stack.shift();
                ya = y + stack.shift();
                xb = xa + stack.shift();
                yb = ya + stack.shift();
                x = xb;
                y = yb;

                if (Math.abs(x - x0) > Math.abs(y - y0)) {
                  x += stack.shift();
                } else {
                  y += stack.shift();
                }

                bezierCurveTo(xa, ya, xb, yb, x, y);
                break;

              default:
                throw new _util.FormatError(`unknown operator: 12 ${v}`);
            }

            break;

          case 14:
            if (stack.length >= 4) {
              const achar = stack.pop();
              const bchar = stack.pop();
              y = stack.pop();
              x = stack.pop();
              cmds.push({
                cmd: "save"
              });
              cmds.push({
                cmd: "translate",
                args: [x, y]
              });
              let cmap = lookupCmap(font.cmap, String.fromCharCode(font.glyphNameMap[_encodings.StandardEncoding[achar]]));
              compileCharString(font.glyphs[cmap.glyphId], cmds, font, cmap.glyphId);
              cmds.push({
                cmd: "restore"
              });
              cmap = lookupCmap(font.cmap, String.fromCharCode(font.glyphNameMap[_encodings.StandardEncoding[bchar]]));
              compileCharString(font.glyphs[cmap.glyphId], cmds, font, cmap.glyphId);
            }

            return;

          case 18:
            stems += stack.length >> 1;
            stackClean = true;
            break;

          case 19:
            stems += stack.length >> 1;
            i += stems + 7 >> 3;
            stackClean = true;
            break;

          case 20:
            stems += stack.length >> 1;
            i += stems + 7 >> 3;
            stackClean = true;
            break;

          case 21:
            y += stack.pop();
            x += stack.pop();
            moveTo(x, y);
            stackClean = true;
            break;

          case 22:
            x += stack.pop();
            moveTo(x, y);
            stackClean = true;
            break;

          case 23:
            stems += stack.length >> 1;
            stackClean = true;
            break;

          case 24:
            while (stack.length > 2) {
              xa = x + stack.shift();
              ya = y + stack.shift();
              xb = xa + stack.shift();
              yb = ya + stack.shift();
              x = xb + stack.shift();
              y = yb + stack.shift();
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }

            x += stack.shift();
            y += stack.shift();
            lineTo(x, y);
            break;

          case 25:
            while (stack.length > 6) {
              x += stack.shift();
              y += stack.shift();
              lineTo(x, y);
            }

            xa = x + stack.shift();
            ya = y + stack.shift();
            xb = xa + stack.shift();
            yb = ya + stack.shift();
            x = xb + stack.shift();
            y = yb + stack.shift();
            bezierCurveTo(xa, ya, xb, yb, x, y);
            break;

          case 26:
            if (stack.length % 2) {
              x += stack.shift();
            }

            while (stack.length > 0) {
              xa = x;
              ya = y + stack.shift();
              xb = xa + stack.shift();
              yb = ya + stack.shift();
              x = xb;
              y = yb + stack.shift();
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }

            break;

          case 27:
            if (stack.length % 2) {
              y += stack.shift();
            }

            while (stack.length > 0) {
              xa = x + stack.shift();
              ya = y;
              xb = xa + stack.shift();
              yb = ya + stack.shift();
              x = xb + stack.shift();
              y = yb;
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }

            break;

          case 28:
            stack.push((code[i] << 24 | code[i + 1] << 16) >> 16);
            i += 2;
            break;

          case 29:
            n = stack.pop() + font.gsubrsBias;
            subrCode = font.gsubrs[n];

            if (subrCode) {
              parse(subrCode);
            }

            break;

          case 30:
            while (stack.length > 0) {
              xa = x;
              ya = y + stack.shift();
              xb = xa + stack.shift();
              yb = ya + stack.shift();
              x = xb + stack.shift();
              y = yb + (stack.length === 1 ? stack.shift() : 0);
              bezierCurveTo(xa, ya, xb, yb, x, y);

              if (stack.length === 0) {
                break;
              }

              xa = x + stack.shift();
              ya = y;
              xb = xa + stack.shift();
              yb = ya + stack.shift();
              y = yb + stack.shift();
              x = xb + (stack.length === 1 ? stack.shift() : 0);
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }

            break;

          case 31:
            while (stack.length > 0) {
              xa = x + stack.shift();
              ya = y;
              xb = xa + stack.shift();
              yb = ya + stack.shift();
              y = yb + stack.shift();
              x = xb + (stack.length === 1 ? stack.shift() : 0);
              bezierCurveTo(xa, ya, xb, yb, x, y);

              if (stack.length === 0) {
                break;
              }

              xa = x;
              ya = y + stack.shift();
              xb = xa + stack.shift();
              yb = ya + stack.shift();
              x = xb + stack.shift();
              y = yb + (stack.length === 1 ? stack.shift() : 0);
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }

            break;

          default:
            if (v < 32) {
              throw new _util.FormatError(`unknown operator: ${v}`);
            }

            if (v < 247) {
              stack.push(v - 139);
            } else if (v < 251) {
              stack.push((v - 247) * 256 + code[i++] + 108);
            } else if (v < 255) {
              stack.push(-(v - 251) * 256 - code[i++] - 108);
            } else {
              stack.push((code[i] << 24 | code[i + 1] << 16 | code[i + 2] << 8 | code[i + 3]) / 65536);
              i += 4;
            }

            break;
        }

        if (stackClean) {
          stack.length = 0;
        }
      }
    }

    parse(charStringCode);
  }