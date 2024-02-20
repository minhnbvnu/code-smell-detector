function updateLineCountAndPosFor(s) {
                const lineStartsOfS = computeLineStarts(s);
                if (lineStartsOfS.length > 1) {
                    lineCount = lineCount + lineStartsOfS.length - 1;
                    linePos = output.length - s.length + last(lineStartsOfS);
                    lineStart = linePos - output.length === 0;
                }
                else {
                    lineStart = false;
                }
            }