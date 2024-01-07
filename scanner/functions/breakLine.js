function breakLine(symbols, lineBreakIndex, lineBreakX) {
            self._lineWidths.push(Math.abs(lineBreakX));
            // in rtl mode lineStartIndex will usually be larger than lineBreakIndex and we will
            // need to adjust the start / end indices when calling symbols.slice()
            const sliceStart = lineStartIndex > lineBreakIndex ? lineBreakIndex + 1 : lineStartIndex;
            const sliceEnd = lineStartIndex > lineBreakIndex ? lineStartIndex + 1 : lineBreakIndex;
            const chars = symbols.slice(sliceStart, sliceEnd);

            // Remove line breaks from line.
            // Line breaks would only be there for the final line
            // when we reach the maxLines limit.
            // TODO: We could possibly not do this and just let lines have
            // new lines in them. Apart from being a bit weird it should not affect
            // the rendered text.
            if (numBreaksThisLine) {
                let i = chars.length;
                while (i-- && numBreaksThisLine > 0) {
                    if (LINE_BREAK_CHAR.test(chars[i])) {
                        chars.splice(i, 1);
                        numBreaksThisLine--;
                    }
                }
            }

            self._lineContents.push(chars.join(''));

            _x = 0;
            _y -= self._scaledLineHeight;
            lines++;
            numWordsThisLine = 0;
            numCharsThisLine = 0;
            numBreaksThisLine = 0;
            wordStartX = 0;
            lineStartIndex = lineBreakIndex;
        }