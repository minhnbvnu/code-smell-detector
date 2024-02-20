function text$6(str, x, y, width, height, z) {
      if (str.length === 0 || width === 0 || height === 0) return;
      if (curTextSize > height) return;
      var spaceMark = -1;
      var start = 0;
      var lineWidth = 0;
      var drawCommands = [];
      for (var charPos = 0, len = str.length; charPos < len; charPos++) {
        var currentChar = str[charPos];
        var spaceChar = currentChar === " ";
        var letterWidth = curTextFont.measureTextWidth(currentChar);
        if (currentChar !== "\n" && lineWidth + letterWidth <= width) {
          if (spaceChar) spaceMark = charPos;
          lineWidth += letterWidth
        } else {
          if (spaceMark + 1 === start) if (charPos > 0) spaceMark = charPos;
          else return;
          if (currentChar === "\n") {
            drawCommands.push({
              text: str.substring(start, charPos),
              width: lineWidth
            });
            start = charPos + 1
          } else {
            drawCommands.push({
              text: str.substring(start, spaceMark + 1),
              width: lineWidth
            });
            start = spaceMark + 1
          }
          lineWidth = 0;
          charPos = start - 1
        }
      }
      if (start < len) drawCommands.push({
        text: str.substring(start),
        width: lineWidth
      });
      var xOffset = 1,
        yOffset = curTextAscent;
      if (horizontalTextAlignment === 3) xOffset = width / 2;
      else if (horizontalTextAlignment === 39) xOffset = width;
      var linesCount = drawCommands.length,
        visibleLines = Math.min(linesCount, Math.floor(height / curTextLeading));
      if (verticalTextAlignment === 101) yOffset = curTextAscent + curTextDescent;
      else if (verticalTextAlignment === 3) yOffset = height / 2 - curTextLeading * (visibleLines / 2 - 1);
      else if (verticalTextAlignment === 102) yOffset = curTextDescent + curTextLeading;
      var command, drawCommand, leading;
      for (command = 0; command < linesCount; command++) {
        leading = command * curTextLeading;
        if (yOffset + leading > height - curTextDescent) break;
        drawCommand = drawCommands[command];
        drawing.text$line(drawCommand.text, x + xOffset, y + yOffset + leading, z, horizontalTextAlignment)
      }
    }