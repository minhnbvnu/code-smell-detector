function processElement(element) {
                if (!element) {
                    return;
                }
                if (decodedTextSpanIntersectsWith(spanStart, spanLength, element.pos, element.getFullWidth())) {
                    checkForClassificationCancellation(cancellationToken, element.kind);
                    for (const child of element.getChildren(sourceFile)) {
                        if (!tryClassifyNode(child)) {
                            processElement(child);
                        }
                    }
                }
            }