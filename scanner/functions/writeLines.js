function writeLines(text) {
                const lines = text.split(/\r\n?|\n/g);
                const indentation = guessIndentation(lines);
                for (const lineText of lines) {
                    const line = indentation ? lineText.slice(indentation) : lineText;
                    if (line.length) {
                        writeLine();
                        write(line);
                    }
                }
            }