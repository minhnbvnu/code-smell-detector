function writeLinesAndIndent(lineCount, writeSpaceIfNotIndenting) {
                if (lineCount) {
                    increaseIndent();
                    writeLine(lineCount);
                }
                else if (writeSpaceIfNotIndenting) {
                    writeSpace();
                }
            }