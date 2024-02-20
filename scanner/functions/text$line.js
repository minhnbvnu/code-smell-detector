function text$line(str, x, y, z, align) {
      var textWidth = 0, xOffset = 0;
      // If the font is a standard Canvas font...
      if (!curTextFont.glyph) {
        if (str && ("fillText" in curContext || "mozDrawText" in curContext)) {
          if (isFillDirty) {
            curContext.fillStyle = p.color.toString(currentFillColor);
            isFillDirty = false;
          }

          // horizontal offset/alignment
          if(align === PConstants.RIGHT || align === PConstants.CENTER) {
            if ("fillText" in curContext) {
              textWidth = curContext.measureText(str).width;
            } else if ("mozDrawText" in curContext) {
              textWidth = curContext.mozMeasureText(str);
            }

            if(align === PConstants.RIGHT) {
              xOffset = -textWidth;
            } else { // if(align === PConstants.CENTER)
              xOffset = -textWidth/2;
            }
          }

          if ("fillText" in curContext) {
            curContext.fillText(str, x+xOffset, y);
          } else if ("mozDrawText" in curContext) {
            saveContext();
            curContext.translate(x+xOffset, y);
            curContext.mozDrawText(str);
            restoreContext();
          }
        }
      } else {
        // If the font is a Batik SVG font...
        var font = p.glyphTable[curTextFont.name];
        saveContext();
        curContext.translate(x, y + curTextSize);

        // horizontal offset/alignment
        if(align === PConstants.RIGHT || align === PConstants.CENTER) {
          textWidth = font.width(str);

          if(align === PConstants.RIGHT) {
            xOffset = -textWidth;
          } else { // if(align === PConstants.CENTER)
            xOffset = -textWidth/2;
          }
        }

        var upem   = font.units_per_em,
          newScale = 1 / upem * curTextSize;

        curContext.scale(newScale, newScale);

        for (var i=0, len=str.length; i < len; i++) {
          // Test character against glyph table
          try {
            p.glyphLook(font, str[i]).draw();
          } catch(e) {
            Processing.debug(e);
          }
        }
        restoreContext();
      }
    }