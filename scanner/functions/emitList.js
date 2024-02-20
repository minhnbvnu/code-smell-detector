function emitList(parentNode, children, format, parenthesizerRule, start, count) {
                emitNodeList(emit, parentNode, children, format | (parentNode && getEmitFlags(parentNode) & 2 /* MultiLine */ ? 65536 /* PreferNewLine */ : 0), parenthesizerRule, start, count);
            }