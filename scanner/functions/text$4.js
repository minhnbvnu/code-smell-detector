function text$4(str, x, y, z) {
      var lines, linesCount;
      if (str.indexOf("\n") < 0) {
        lines = [str];
        linesCount = 1
      } else {
        lines = str.split(/\r?\n/g);
        linesCount = lines.length
      }
      var yOffset = 0;
      if (verticalTextAlignment === 101) yOffset = curTextAscent + curTextDescent;
      else if (verticalTextAlignment === 3) yOffset = curTextAscent / 2 - (linesCount - 1) * curTextLeading / 2;
      else if (verticalTextAlignment === 102) yOffset = -(curTextDescent + (linesCount - 1) * curTextLeading);
      for (var i = 0; i < linesCount; ++i) {
        var line = lines[i];
        drawing.text$line(line, x, y + yOffset, z, horizontalTextAlignment);
        yOffset += curTextLeading
      }
    }