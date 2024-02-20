function characterToColumn(startLinePosition, characterInLine) {
                let column = 0;
                for (let i = 0; i < characterInLine; i++) {
                    if (sourceFile.text.charCodeAt(startLinePosition + i) === 9 /* tab */) {
                        column += options.tabSize - column % options.tabSize;
                    }
                    else {
                        column++;
                    }
                }
                return column;
            }