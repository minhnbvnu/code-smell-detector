function getFormattingScanner(text, languageVariant, startPos, endPos, cb) {
            const scanner2 = languageVariant === 1 /* JSX */ ? jsxScanner : standardScanner;
            scanner2.setText(text);
            scanner2.setTextPos(startPos);
            let wasNewLine = true;
            let leadingTrivia;
            let trailingTrivia;
            let savedPos;
            let lastScanAction;
            let lastTokenInfo;
            const res = cb({
                advance,
                readTokenInfo,
                readEOFTokenRange,
                isOnToken,
                isOnEOF,
                getCurrentLeadingTrivia: () => leadingTrivia,
                lastTrailingTriviaWasNewLine: () => wasNewLine,
                skipToEndOf,
                skipToStartOf,
                getStartPos: () => {
                    var _a2;
                    return (_a2 = lastTokenInfo == null ? void 0 : lastTokenInfo.token.pos) != null ? _a2 : scanner2.getTokenPos();
                }
            });
            lastTokenInfo = void 0;
            scanner2.setText(void 0);
            return res;
            function advance() {
                lastTokenInfo = void 0;
                const isStarted = scanner2.getStartPos() !== startPos;
                if (isStarted) {
                    wasNewLine = !!trailingTrivia && last(trailingTrivia).kind === 4 /* NewLineTrivia */;
                }
                else {
                    scanner2.scan();
                }
                leadingTrivia = void 0;
                trailingTrivia = void 0;
                let pos = scanner2.getStartPos();
                while (pos < endPos) {
                    const t = scanner2.getToken();
                    if (!isTrivia(t)) {
                        break;
                    }
                    scanner2.scan();
                    const item = {
                        pos,
                        end: scanner2.getStartPos(),
                        kind: t
                    };
                    pos = scanner2.getStartPos();
                    leadingTrivia = append(leadingTrivia, item);
                }
                savedPos = scanner2.getStartPos();
            }
            function shouldRescanGreaterThanToken(node) {
                switch (node.kind) {
                    case 33 /* GreaterThanEqualsToken */:
                    case 71 /* GreaterThanGreaterThanEqualsToken */:
                    case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                    case 48 /* GreaterThanGreaterThanToken */:
                        return true;
                }
                return false;
            }
            function shouldRescanJsxIdentifier(node) {
                if (node.parent) {
                    switch (node.parent.kind) {
                        case 288 /* JsxAttribute */:
                        case 283 /* JsxOpeningElement */:
                        case 284 /* JsxClosingElement */:
                        case 282 /* JsxSelfClosingElement */:
                            return isKeyword(node.kind) || node.kind === 79 /* Identifier */;
                    }
                }
                return false;
            }
            function shouldRescanJsxText(node) {
                return isJsxText(node) || isJsxElement(node) && (lastTokenInfo == null ? void 0 : lastTokenInfo.token.kind) === 11 /* JsxText */;
            }
            function shouldRescanSlashToken(container) {
                return container.kind === 13 /* RegularExpressionLiteral */;
            }
            function shouldRescanTemplateToken(container) {
                return container.kind === 16 /* TemplateMiddle */ || container.kind === 17 /* TemplateTail */;
            }
            function shouldRescanJsxAttributeValue(node) {
                return node.parent && isJsxAttribute(node.parent) && node.parent.initializer === node;
            }
            function startsWithSlashToken(t) {
                return t === 43 /* SlashToken */ || t === 68 /* SlashEqualsToken */;
            }
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
            function getNextToken(n, expectedScanAction) {
                const token = scanner2.getToken();
                lastScanAction = 0 /* Scan */;
                switch (expectedScanAction) {
                    case 1 /* RescanGreaterThanToken */:
                        if (token === 31 /* GreaterThanToken */) {
                            lastScanAction = 1 /* RescanGreaterThanToken */;
                            const newToken = scanner2.reScanGreaterToken();
                            Debug.assert(n.kind === newToken);
                            return newToken;
                        }
                        break;
                    case 2 /* RescanSlashToken */:
                        if (startsWithSlashToken(token)) {
                            lastScanAction = 2 /* RescanSlashToken */;
                            const newToken = scanner2.reScanSlashToken();
                            Debug.assert(n.kind === newToken);
                            return newToken;
                        }
                        break;
                    case 3 /* RescanTemplateToken */:
                        if (token === 19 /* CloseBraceToken */) {
                            lastScanAction = 3 /* RescanTemplateToken */;
                            return scanner2.reScanTemplateToken(
                            /* isTaggedTemplate */
                            false);
                        }
                        break;
                    case 4 /* RescanJsxIdentifier */:
                        lastScanAction = 4 /* RescanJsxIdentifier */;
                        return scanner2.scanJsxIdentifier();
                    case 5 /* RescanJsxText */:
                        lastScanAction = 5 /* RescanJsxText */;
                        return scanner2.reScanJsxToken(
                        /* allowMultilineJsxText */
                        false);
                    case 6 /* RescanJsxAttributeValue */:
                        lastScanAction = 6 /* RescanJsxAttributeValue */;
                        return scanner2.reScanJsxAttributeValue();
                    case 0 /* Scan */:
                        break;
                    default:
                        Debug.assertNever(expectedScanAction);
                }
                return token;
            }
            function readEOFTokenRange() {
                Debug.assert(isOnEOF());
                return createTextRangeWithKind(scanner2.getStartPos(), scanner2.getTextPos(), 1 /* EndOfFileToken */);
            }
            function isOnToken() {
                const current = lastTokenInfo ? lastTokenInfo.token.kind : scanner2.getToken();
                return current !== 1 /* EndOfFileToken */ && !isTrivia(current);
            }
            function isOnEOF() {
                const current = lastTokenInfo ? lastTokenInfo.token.kind : scanner2.getToken();
                return current === 1 /* EndOfFileToken */;
            }
            function fixTokenKind(tokenInfo, container) {
                if (isToken(container) && tokenInfo.token.kind !== container.kind) {
                    tokenInfo.token.kind = container.kind;
                }
                return tokenInfo;
            }
            function skipToEndOf(node) {
                scanner2.setTextPos(node.end);
                savedPos = scanner2.getStartPos();
                lastScanAction = void 0;
                lastTokenInfo = void 0;
                wasNewLine = false;
                leadingTrivia = void 0;
                trailingTrivia = void 0;
            }
            function skipToStartOf(node) {
                scanner2.setTextPos(node.pos);
                savedPos = scanner2.getStartPos();
                lastScanAction = void 0;
                lastTokenInfo = void 0;
                wasNewLine = false;
                leadingTrivia = void 0;
                trailingTrivia = void 0;
            }
        }