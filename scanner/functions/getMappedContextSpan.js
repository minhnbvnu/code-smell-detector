function getMappedContextSpan(documentSpan, sourceMapper, fileExists) {
            const contextSpanStart = documentSpan.contextSpan && getMappedLocation({ fileName: documentSpan.fileName, pos: documentSpan.contextSpan.start }, sourceMapper, fileExists);
            const contextSpanEnd = documentSpan.contextSpan && getMappedLocation({ fileName: documentSpan.fileName, pos: documentSpan.contextSpan.start + documentSpan.contextSpan.length }, sourceMapper, fileExists);
            return contextSpanStart && contextSpanEnd ? { start: contextSpanStart.pos, length: contextSpanEnd.pos - contextSpanStart.pos } : void 0;
        }