function guessIndentation(lines) {
            let indentation = MAX_SMI_X86;
            for (const line of lines) {
                if (!line.length) {
                    continue;
                }
                let i = 0;
                for (; i < line.length && i < indentation; i++) {
                    if (!isWhiteSpaceLike(line.charCodeAt(i))) {
                        break;
                    }
                }
                if (i < indentation) {
                    indentation = i;
                }
                if (indentation === 0) {
                    return 0;
                }
            }
            return indentation === MAX_SMI_X86 ? void 0 : indentation;
        }