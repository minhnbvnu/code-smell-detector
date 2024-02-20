function getAdjustedSpanFromNodes(startNode2, endNode2, sourceFile) {
            const start = startNode2.getStart(sourceFile);
            let end = endNode2.getEnd();
            if (sourceFile.text.charCodeAt(end) === 59 /* semicolon */) {
                end++;
            }
            return { start, length: end - start };
        }