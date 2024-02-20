function getEncodedSemanticClassifications(typeChecker, cancellationToken, sourceFile, classifiableNames, span) {
            const spans = [];
            sourceFile.forEachChild(function cb(node) {
                if (!node || !textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
                    return;
                }
                checkForClassificationCancellation(cancellationToken, node.kind);
                if (isIdentifier(node) && !nodeIsMissing(node) && classifiableNames.has(node.escapedText)) {
                    const symbol = typeChecker.getSymbolAtLocation(node);
                    const type = symbol && classifySymbol(symbol, getMeaningFromLocation(node), typeChecker);
                    if (type) {
                        pushClassification(node.getStart(sourceFile), node.getEnd(), type);
                    }
                }
                node.forEachChild(cb);
            });
            return { spans, endOfLineState: 0 /* None */ };
            function pushClassification(start, end, type) {
                const length2 = end - start;
                Debug.assert(length2 > 0, `Classification had non-positive length of ${length2}`);
                spans.push(start);
                spans.push(length2);
                spans.push(type);
            }
        }