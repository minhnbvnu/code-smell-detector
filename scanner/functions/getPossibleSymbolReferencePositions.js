function getPossibleSymbolReferencePositions(sourceFile, symbolName2, container = sourceFile) {
                        const positions = [];
                        if (!symbolName2 || !symbolName2.length) {
                            return positions;
                        }
                        const text = sourceFile.text;
                        const sourceLength = text.length;
                        const symbolNameLength = symbolName2.length;
                        let position = text.indexOf(symbolName2, container.pos);
                        while (position >= 0) {
                            if (position > container.end)
                                break;
                            const endPosition = position + symbolNameLength;
                            if ((position === 0 || !isIdentifierPart(text.charCodeAt(position - 1), 99 /* Latest */)) && (endPosition === sourceLength || !isIdentifierPart(text.charCodeAt(endPosition), 99 /* Latest */))) {
                                positions.push(position);
                            }
                            position = text.indexOf(symbolName2, position + symbolNameLength + 1);
                        }
                        return positions;
                    }