function synthesizedNodeStartsOnNewLine(node, format) {
                if (nodeIsSynthesized(node)) {
                    const startsOnNewLine = getStartsOnNewLine(node);
                    if (startsOnNewLine === void 0) {
                        return (format & 65536 /* PreferNewLine */) !== 0;
                    }
                    return startsOnNewLine;
                }
                return (format & 65536 /* PreferNewLine */) !== 0;
            }