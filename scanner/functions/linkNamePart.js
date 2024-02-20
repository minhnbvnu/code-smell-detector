function linkNamePart(text, target) {
            return {
                text,
                kind: SymbolDisplayPartKind[23 /* linkName */],
                target: {
                    fileName: getSourceFileOfNode(target).fileName,
                    textSpan: createTextSpanFromNode(target)
                }
            };
        }