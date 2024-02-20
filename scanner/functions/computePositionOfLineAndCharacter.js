function computePositionOfLineAndCharacter(lineStarts, line, character, debugText, allowEdits) {
            if (line < 0 || line >= lineStarts.length) {
                if (allowEdits) {
                    line = line < 0 ? 0 : line >= lineStarts.length ? lineStarts.length - 1 : line;
                }
                else {
                    Debug.fail(`Bad line number. Line: ${line}, lineStarts.length: ${lineStarts.length} , line map is correct? ${debugText !== void 0 ? arraysEqual(lineStarts, computeLineStarts(debugText)) : "unknown"}`);
                }
            }
            const res = lineStarts[line] + character;
            if (allowEdits) {
                return res > lineStarts[line + 1] ? lineStarts[line + 1] : typeof debugText === "string" && res > debugText.length ? debugText.length : res;
            }
            if (line < lineStarts.length - 1) {
                Debug.assert(res < lineStarts[line + 1]);
            }
            else if (debugText !== void 0) {
                Debug.assert(res <= debugText.length);
            }
            return res;
        }