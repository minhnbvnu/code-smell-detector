function markPrecedingCommentDirectiveLine(diagnostic, directives) {
                const { file, start } = diagnostic;
                if (!file) {
                    return -1;
                }
                const lineStarts = getLineStarts(file);
                let line = computeLineAndCharacterOfPosition(lineStarts, start).line - 1;
                while (line >= 0) {
                    if (directives.markUsed(line)) {
                        return line;
                    }
                    const lineText = file.text.slice(lineStarts[line], lineStarts[line + 1]).trim();
                    if (lineText !== "" && !/^(\s*)\/\/(.*)$/.test(lineText)) {
                        return -1;
                    }
                    line--;
                }
                return -1;
            }