function getMappedDocumentSpan(documentSpan, sourceMapper, fileExists) {
            const { fileName, textSpan } = documentSpan;
            const newPosition = getMappedLocation({ fileName, pos: textSpan.start }, sourceMapper, fileExists);
            if (!newPosition)
                return void 0;
            const newEndPosition = getMappedLocation({ fileName, pos: textSpan.start + textSpan.length }, sourceMapper, fileExists);
            const newLength = newEndPosition ? newEndPosition.pos - newPosition.pos : textSpan.length;
            return {
                fileName: newPosition.fileName,
                textSpan: {
                    start: newPosition.pos,
                    length: newLength
                },
                originalFileName: documentSpan.fileName,
                originalTextSpan: documentSpan.textSpan,
                contextSpan: getMappedContextSpan(documentSpan, sourceMapper, fileExists),
                originalContextSpan: documentSpan.contextSpan
            };
        }