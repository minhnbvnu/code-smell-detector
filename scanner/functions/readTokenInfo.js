function readTokenInfo(n) {
                Debug.assert(isOnToken());
                const expectedScanAction = shouldRescanGreaterThanToken(n) ? 1 /* RescanGreaterThanToken */ : shouldRescanSlashToken(n) ? 2 /* RescanSlashToken */ : shouldRescanTemplateToken(n) ? 3 /* RescanTemplateToken */ : shouldRescanJsxIdentifier(n) ? 4 /* RescanJsxIdentifier */ : shouldRescanJsxText(n) ? 5 /* RescanJsxText */ : shouldRescanJsxAttributeValue(n) ? 6 /* RescanJsxAttributeValue */ : 0 /* Scan */;
                if (lastTokenInfo && expectedScanAction === lastScanAction) {
                    return fixTokenKind(lastTokenInfo, n);
                }
                if (scanner2.getStartPos() !== savedPos) {
                    Debug.assert(lastTokenInfo !== void 0);
                    scanner2.setTextPos(savedPos);
                    scanner2.scan();
                }
                let currentToken = getNextToken(n, expectedScanAction);
                const token = createTextRangeWithKind(scanner2.getStartPos(), scanner2.getTextPos(), currentToken);
                if (trailingTrivia) {
                    trailingTrivia = void 0;
                }
                while (scanner2.getStartPos() < endPos) {
                    currentToken = scanner2.scan();
                    if (!isTrivia(currentToken)) {
                        break;
                    }
                    const trivia = createTextRangeWithKind(scanner2.getStartPos(), scanner2.getTextPos(), currentToken);
                    if (!trailingTrivia) {
                        trailingTrivia = [];
                    }
                    trailingTrivia.push(trivia);
                    if (currentToken === 4 /* NewLineTrivia */) {
                        scanner2.scan();
                        break;
                    }
                }
                lastTokenInfo = { leadingTrivia, trailingTrivia, token };
                return fixTokenKind(lastTokenInfo, n);
            }