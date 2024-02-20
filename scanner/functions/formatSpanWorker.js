function formatSpanWorker(originalRange, enclosingNode, initialIndentation, delta, formattingScanner, { options, getRules, host }, requestKind, rangeContainsError, sourceFile) {
            var _a2;
            const formattingContext = new FormattingContext(sourceFile, requestKind, options);
            let previousRangeTriviaEnd;
            let previousRange;
            let previousParent;
            let previousRangeStartLine;
            let lastIndentedLine;
            let indentationOnLastIndentedLine = -1 /* Unknown */;
            const edits = [];
            formattingScanner.advance();
            if (formattingScanner.isOnToken()) {
                const startLine = sourceFile.getLineAndCharacterOfPosition(enclosingNode.getStart(sourceFile)).line;
                let undecoratedStartLine = startLine;
                if (hasDecorators(enclosingNode)) {
                    undecoratedStartLine = sourceFile.getLineAndCharacterOfPosition(getNonDecoratorTokenPosOfNode(enclosingNode, sourceFile)).line;
                }
                processNode(enclosingNode, enclosingNode, startLine, undecoratedStartLine, initialIndentation, delta);
            }
            if (!formattingScanner.isOnToken()) {
                const indentation = SmartIndenter.nodeWillIndentChild(options, enclosingNode, 
                /*child*/
                void 0, sourceFile, 
                /*indentByDefault*/
                false) ? initialIndentation + options.indentSize : initialIndentation;
                const leadingTrivia = formattingScanner.getCurrentLeadingTrivia();
                if (leadingTrivia) {
                    indentTriviaItems(leadingTrivia, indentation, 
                    /*indentNextTokenOrTrivia*/
                    false, (item) => processRange(item, sourceFile.getLineAndCharacterOfPosition(item.pos), enclosingNode, enclosingNode, 
                    /*dynamicIndentation*/
                    void 0));
                    if (options.trimTrailingWhitespace !== false) {
                        trimTrailingWhitespacesForRemainingRange(leadingTrivia);
                    }
                }
            }
            if (previousRange && formattingScanner.getStartPos() >= originalRange.end) {
                const tokenInfo = formattingScanner.isOnEOF() ? formattingScanner.readEOFTokenRange() : formattingScanner.isOnToken() ? formattingScanner.readTokenInfo(enclosingNode).token : void 0;
                if (tokenInfo && tokenInfo.pos === previousRangeTriviaEnd) {
                    const parent2 = ((_a2 = findPrecedingToken(tokenInfo.end, sourceFile, enclosingNode)) == null ? void 0 : _a2.parent) || previousParent;
                    processPair(tokenInfo, sourceFile.getLineAndCharacterOfPosition(tokenInfo.pos).line, parent2, previousRange, previousRangeStartLine, previousParent, parent2, 
                    /*dynamicIndentation*/
                    void 0);
                }
            }
            return edits;
            function tryComputeIndentationForListItem(startPos, endPos, parentStartLine, range, inheritedIndentation) {
                if (rangeOverlapsWithStartEnd(range, startPos, endPos) || rangeContainsStartEnd(range, startPos, endPos)) {
                    if (inheritedIndentation !== -1 /* Unknown */) {
                        return inheritedIndentation;
                    }
                }
                else {
                    const startLine = sourceFile.getLineAndCharacterOfPosition(startPos).line;
                    const startLinePosition = getLineStartPositionForPosition(startPos, sourceFile);
                    const column = SmartIndenter.findFirstNonWhitespaceColumn(startLinePosition, startPos, sourceFile, options);
                    if (startLine !== parentStartLine || startPos === column) {
                        const baseIndentSize = SmartIndenter.getBaseIndentation(options);
                        return baseIndentSize > column ? baseIndentSize : column;
                    }
                }
                return -1 /* Unknown */;
            }
            function computeIndentation(node, startLine, inheritedIndentation, parent2, parentDynamicIndentation, effectiveParentStartLine) {
                const delta2 = SmartIndenter.shouldIndentChildNode(options, node) ? options.indentSize : 0;
                if (effectiveParentStartLine === startLine) {
                    return {
                        indentation: startLine === lastIndentedLine ? indentationOnLastIndentedLine : parentDynamicIndentation.getIndentation(),
                        delta: Math.min(options.indentSize, parentDynamicIndentation.getDelta(node) + delta2)
                    };
                }
                else if (inheritedIndentation === -1 /* Unknown */) {
                    if (node.kind === 20 /* OpenParenToken */ && startLine === lastIndentedLine) {
                        return { indentation: indentationOnLastIndentedLine, delta: parentDynamicIndentation.getDelta(node) };
                    }
                    else if (SmartIndenter.childStartsOnTheSameLineWithElseInIfStatement(parent2, node, startLine, sourceFile) || SmartIndenter.childIsUnindentedBranchOfConditionalExpression(parent2, node, startLine, sourceFile) || SmartIndenter.argumentStartsOnSameLineAsPreviousArgument(parent2, node, startLine, sourceFile)) {
                        return { indentation: parentDynamicIndentation.getIndentation(), delta: delta2 };
                    }
                    else {
                        return { indentation: parentDynamicIndentation.getIndentation() + parentDynamicIndentation.getDelta(node), delta: delta2 };
                    }
                }
                else {
                    return { indentation: inheritedIndentation, delta: delta2 };
                }
            }
            function getFirstNonDecoratorTokenOfNode(node) {
                if (canHaveModifiers(node)) {
                    const modifier = find(node.modifiers, isModifier, findIndex(node.modifiers, isDecorator));
                    if (modifier)
                        return modifier.kind;
                }
                switch (node.kind) {
                    case 260 /* ClassDeclaration */:
                        return 84 /* ClassKeyword */;
                    case 261 /* InterfaceDeclaration */:
                        return 118 /* InterfaceKeyword */;
                    case 259 /* FunctionDeclaration */:
                        return 98 /* FunctionKeyword */;
                    case 263 /* EnumDeclaration */:
                        return 263 /* EnumDeclaration */;
                    case 174 /* GetAccessor */:
                        return 137 /* GetKeyword */;
                    case 175 /* SetAccessor */:
                        return 151 /* SetKeyword */;
                    case 171 /* MethodDeclaration */:
                        if (node.asteriskToken) {
                            return 41 /* AsteriskToken */;
                        }
                    case 169 /* PropertyDeclaration */:
                    case 166 /* Parameter */:
                        const name = getNameOfDeclaration(node);
                        if (name) {
                            return name.kind;
                        }
                }
            }
            function getDynamicIndentation(node, nodeStartLine, indentation, delta2) {
                return {
                    getIndentationForComment: (kind, tokenIndentation, container) => {
                        switch (kind) {
                            case 19 /* CloseBraceToken */:
                            case 23 /* CloseBracketToken */:
                            case 21 /* CloseParenToken */:
                                return indentation + getDelta(container);
                        }
                        return tokenIndentation !== -1 /* Unknown */ ? tokenIndentation : indentation;
                    },
                    // if list end token is LessThanToken '>' then its delta should be explicitly suppressed
                    // so that LessThanToken as a binary operator can still be indented.
                    // foo.then
                    //     <
                    //         number,
                    //         string,
                    //     >();
                    // vs
                    // var a = xValue
                    //     > yValue;
                    getIndentationForToken: (line, kind, container, suppressDelta) => !suppressDelta && shouldAddDelta(line, kind, container) ? indentation + getDelta(container) : indentation,
                    getIndentation: () => indentation,
                    getDelta,
                    recomputeIndentation: (lineAdded, parent2) => {
                        if (SmartIndenter.shouldIndentChildNode(options, parent2, node, sourceFile)) {
                            indentation += lineAdded ? options.indentSize : -options.indentSize;
                            delta2 = SmartIndenter.shouldIndentChildNode(options, node) ? options.indentSize : 0;
                        }
                    }
                };
                function shouldAddDelta(line, kind, container) {
                    switch (kind) {
                        case 18 /* OpenBraceToken */:
                        case 19 /* CloseBraceToken */:
                        case 21 /* CloseParenToken */:
                        case 91 /* ElseKeyword */:
                        case 115 /* WhileKeyword */:
                        case 59 /* AtToken */:
                            return false;
                        case 43 /* SlashToken */:
                        case 31 /* GreaterThanToken */:
                            switch (container.kind) {
                                case 283 /* JsxOpeningElement */:
                                case 284 /* JsxClosingElement */:
                                case 282 /* JsxSelfClosingElement */:
                                    return false;
                            }
                            break;
                        case 22 /* OpenBracketToken */:
                        case 23 /* CloseBracketToken */:
                            if (container.kind !== 197 /* MappedType */) {
                                return false;
                            }
                            break;
                    }
                    return nodeStartLine !== line && !(hasDecorators(node) && kind === getFirstNonDecoratorTokenOfNode(node));
                }
                function getDelta(child) {
                    return SmartIndenter.nodeWillIndentChild(options, node, child, sourceFile, 
                    /*indentByDefault*/
                    true) ? delta2 : 0;
                }
            }
            function processNode(node, contextNode, nodeStartLine, undecoratedNodeStartLine, indentation, delta2) {
                if (!rangeOverlapsWithStartEnd(originalRange, node.getStart(sourceFile), node.getEnd())) {
                    return;
                }
                const nodeDynamicIndentation = getDynamicIndentation(node, nodeStartLine, indentation, delta2);
                let childContextNode = contextNode;
                forEachChild(node, (child) => {
                    processChildNode(child, 
                    /*inheritedIndentation*/
                    -1 /* Unknown */, node, nodeDynamicIndentation, nodeStartLine, undecoratedNodeStartLine, 
                    /*isListItem*/
                    false);
                }, (nodes) => {
                    processChildNodes(nodes, node, nodeStartLine, nodeDynamicIndentation);
                });
                while (formattingScanner.isOnToken() && formattingScanner.getStartPos() < originalRange.end) {
                    const tokenInfo = formattingScanner.readTokenInfo(node);
                    if (tokenInfo.token.end > Math.min(node.end, originalRange.end)) {
                        break;
                    }
                    consumeTokenAndAdvanceScanner(tokenInfo, node, nodeDynamicIndentation, node);
                }
                function processChildNode(child, inheritedIndentation, parent2, parentDynamicIndentation, parentStartLine, undecoratedParentStartLine, isListItem, isFirstListItem) {
                    Debug.assert(!nodeIsSynthesized(child));
                    if (nodeIsMissing(child) || isGrammarError(parent2, child)) {
                        return inheritedIndentation;
                    }
                    const childStartPos = child.getStart(sourceFile);
                    const childStartLine = sourceFile.getLineAndCharacterOfPosition(childStartPos).line;
                    let undecoratedChildStartLine = childStartLine;
                    if (hasDecorators(child)) {
                        undecoratedChildStartLine = sourceFile.getLineAndCharacterOfPosition(getNonDecoratorTokenPosOfNode(child, sourceFile)).line;
                    }
                    let childIndentationAmount = -1 /* Unknown */;
                    if (isListItem && rangeContainsRange(originalRange, parent2)) {
                        childIndentationAmount = tryComputeIndentationForListItem(childStartPos, child.end, parentStartLine, originalRange, inheritedIndentation);
                        if (childIndentationAmount !== -1 /* Unknown */) {
                            inheritedIndentation = childIndentationAmount;
                        }
                    }
                    if (!rangeOverlapsWithStartEnd(originalRange, child.pos, child.end)) {
                        if (child.end < originalRange.pos) {
                            formattingScanner.skipToEndOf(child);
                        }
                        return inheritedIndentation;
                    }
                    if (child.getFullWidth() === 0) {
                        return inheritedIndentation;
                    }
                    while (formattingScanner.isOnToken() && formattingScanner.getStartPos() < originalRange.end) {
                        const tokenInfo = formattingScanner.readTokenInfo(node);
                        if (tokenInfo.token.end > originalRange.end) {
                            return inheritedIndentation;
                        }
                        if (tokenInfo.token.end > childStartPos) {
                            if (tokenInfo.token.pos > childStartPos) {
                                formattingScanner.skipToStartOf(child);
                            }
                            break;
                        }
                        consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation, node);
                    }
                    if (!formattingScanner.isOnToken() || formattingScanner.getStartPos() >= originalRange.end) {
                        return inheritedIndentation;
                    }
                    if (isToken(child)) {
                        const tokenInfo = formattingScanner.readTokenInfo(child);
                        if (child.kind !== 11 /* JsxText */) {
                            Debug.assert(tokenInfo.token.end === child.end, "Token end is child end");
                            consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation, child);
                            return inheritedIndentation;
                        }
                    }
                    const effectiveParentStartLine = child.kind === 167 /* Decorator */ ? childStartLine : undecoratedParentStartLine;
                    const childIndentation = computeIndentation(child, childStartLine, childIndentationAmount, node, parentDynamicIndentation, effectiveParentStartLine);
                    processNode(child, childContextNode, childStartLine, undecoratedChildStartLine, childIndentation.indentation, childIndentation.delta);
                    childContextNode = node;
                    if (isFirstListItem && parent2.kind === 206 /* ArrayLiteralExpression */ && inheritedIndentation === -1 /* Unknown */) {
                        inheritedIndentation = childIndentation.indentation;
                    }
                    return inheritedIndentation;
                }
                function processChildNodes(nodes, parent2, parentStartLine, parentDynamicIndentation) {
                    Debug.assert(isNodeArray(nodes));
                    Debug.assert(!nodeIsSynthesized(nodes));
                    const listStartToken = getOpenTokenForList(parent2, nodes);
                    let listDynamicIndentation = parentDynamicIndentation;
                    let startLine = parentStartLine;
                    if (!rangeOverlapsWithStartEnd(originalRange, nodes.pos, nodes.end)) {
                        if (nodes.end < originalRange.pos) {
                            formattingScanner.skipToEndOf(nodes);
                        }
                        return;
                    }
                    if (listStartToken !== 0 /* Unknown */) {
                        while (formattingScanner.isOnToken() && formattingScanner.getStartPos() < originalRange.end) {
                            const tokenInfo = formattingScanner.readTokenInfo(parent2);
                            if (tokenInfo.token.end > nodes.pos) {
                                break;
                            }
                            else if (tokenInfo.token.kind === listStartToken) {
                                startLine = sourceFile.getLineAndCharacterOfPosition(tokenInfo.token.pos).line;
                                consumeTokenAndAdvanceScanner(tokenInfo, parent2, parentDynamicIndentation, parent2);
                                let indentationOnListStartToken;
                                if (indentationOnLastIndentedLine !== -1 /* Unknown */) {
                                    indentationOnListStartToken = indentationOnLastIndentedLine;
                                }
                                else {
                                    const startLinePosition = getLineStartPositionForPosition(tokenInfo.token.pos, sourceFile);
                                    indentationOnListStartToken = SmartIndenter.findFirstNonWhitespaceColumn(startLinePosition, tokenInfo.token.pos, sourceFile, options);
                                }
                                listDynamicIndentation = getDynamicIndentation(parent2, parentStartLine, indentationOnListStartToken, options.indentSize);
                            }
                            else {
                                consumeTokenAndAdvanceScanner(tokenInfo, parent2, parentDynamicIndentation, parent2);
                            }
                        }
                    }
                    let inheritedIndentation = -1 /* Unknown */;
                    for (let i = 0; i < nodes.length; i++) {
                        const child = nodes[i];
                        inheritedIndentation = processChildNode(child, inheritedIndentation, node, listDynamicIndentation, startLine, startLine, 
                        /*isListItem*/
                        true, 
                        /*isFirstListItem*/
                        i === 0);
                    }
                    const listEndToken = getCloseTokenForOpenToken(listStartToken);
                    if (listEndToken !== 0 /* Unknown */ && formattingScanner.isOnToken() && formattingScanner.getStartPos() < originalRange.end) {
                        let tokenInfo = formattingScanner.readTokenInfo(parent2);
                        if (tokenInfo.token.kind === 27 /* CommaToken */) {
                            consumeTokenAndAdvanceScanner(tokenInfo, parent2, listDynamicIndentation, parent2);
                            tokenInfo = formattingScanner.isOnToken() ? formattingScanner.readTokenInfo(parent2) : void 0;
                        }
                        if (tokenInfo && tokenInfo.token.kind === listEndToken && rangeContainsRange(parent2, tokenInfo.token)) {
                            consumeTokenAndAdvanceScanner(tokenInfo, parent2, listDynamicIndentation, parent2, 
                            /*isListEndToken*/
                            true);
                        }
                    }
                }
                function consumeTokenAndAdvanceScanner(currentTokenInfo, parent2, dynamicIndentation, container, isListEndToken) {
                    Debug.assert(rangeContainsRange(parent2, currentTokenInfo.token));
                    const lastTriviaWasNewLine = formattingScanner.lastTrailingTriviaWasNewLine();
                    let indentToken = false;
                    if (currentTokenInfo.leadingTrivia) {
                        processTrivia(currentTokenInfo.leadingTrivia, parent2, childContextNode, dynamicIndentation);
                    }
                    let lineAction = 0 /* None */;
                    const isTokenInRange = rangeContainsRange(originalRange, currentTokenInfo.token);
                    const tokenStart = sourceFile.getLineAndCharacterOfPosition(currentTokenInfo.token.pos);
                    if (isTokenInRange) {
                        const rangeHasError = rangeContainsError(currentTokenInfo.token);
                        const savePreviousRange = previousRange;
                        lineAction = processRange(currentTokenInfo.token, tokenStart, parent2, childContextNode, dynamicIndentation);
                        if (!rangeHasError) {
                            if (lineAction === 0 /* None */) {
                                const prevEndLine = savePreviousRange && sourceFile.getLineAndCharacterOfPosition(savePreviousRange.end).line;
                                indentToken = lastTriviaWasNewLine && tokenStart.line !== prevEndLine;
                            }
                            else {
                                indentToken = lineAction === 1 /* LineAdded */;
                            }
                        }
                    }
                    if (currentTokenInfo.trailingTrivia) {
                        previousRangeTriviaEnd = last(currentTokenInfo.trailingTrivia).end;
                        processTrivia(currentTokenInfo.trailingTrivia, parent2, childContextNode, dynamicIndentation);
                    }
                    if (indentToken) {
                        const tokenIndentation = isTokenInRange && !rangeContainsError(currentTokenInfo.token) ? dynamicIndentation.getIndentationForToken(tokenStart.line, currentTokenInfo.token.kind, container, !!isListEndToken) : -1 /* Unknown */;
                        let indentNextTokenOrTrivia = true;
                        if (currentTokenInfo.leadingTrivia) {
                            const commentIndentation = dynamicIndentation.getIndentationForComment(currentTokenInfo.token.kind, tokenIndentation, container);
                            indentNextTokenOrTrivia = indentTriviaItems(currentTokenInfo.leadingTrivia, commentIndentation, indentNextTokenOrTrivia, (item) => insertIndentation(item.pos, commentIndentation, 
                            /*lineAdded*/
                            false));
                        }
                        if (tokenIndentation !== -1 /* Unknown */ && indentNextTokenOrTrivia) {
                            insertIndentation(currentTokenInfo.token.pos, tokenIndentation, lineAction === 1 /* LineAdded */);
                            lastIndentedLine = tokenStart.line;
                            indentationOnLastIndentedLine = tokenIndentation;
                        }
                    }
                    formattingScanner.advance();
                    childContextNode = parent2;
                }
            }
            function indentTriviaItems(trivia, commentIndentation, indentNextTokenOrTrivia, indentSingleLine) {
                for (const triviaItem of trivia) {
                    const triviaInRange = rangeContainsRange(originalRange, triviaItem);
                    switch (triviaItem.kind) {
                        case 3 /* MultiLineCommentTrivia */:
                            if (triviaInRange) {
                                indentMultilineComment(triviaItem, commentIndentation, 
                                /*firstLineIsIndented*/
                                !indentNextTokenOrTrivia);
                            }
                            indentNextTokenOrTrivia = false;
                            break;
                        case 2 /* SingleLineCommentTrivia */:
                            if (indentNextTokenOrTrivia && triviaInRange) {
                                indentSingleLine(triviaItem);
                            }
                            indentNextTokenOrTrivia = false;
                            break;
                        case 4 /* NewLineTrivia */:
                            indentNextTokenOrTrivia = true;
                            break;
                    }
                }
                return indentNextTokenOrTrivia;
            }
            function processTrivia(trivia, parent2, contextNode, dynamicIndentation) {
                for (const triviaItem of trivia) {
                    if (isComment(triviaItem.kind) && rangeContainsRange(originalRange, triviaItem)) {
                        const triviaItemStart = sourceFile.getLineAndCharacterOfPosition(triviaItem.pos);
                        processRange(triviaItem, triviaItemStart, parent2, contextNode, dynamicIndentation);
                    }
                }
            }
            function processRange(range, rangeStart, parent2, contextNode, dynamicIndentation) {
                const rangeHasError = rangeContainsError(range);
                let lineAction = 0 /* None */;
                if (!rangeHasError) {
                    if (!previousRange) {
                        const originalStart = sourceFile.getLineAndCharacterOfPosition(originalRange.pos);
                        trimTrailingWhitespacesForLines(originalStart.line, rangeStart.line);
                    }
                    else {
                        lineAction = processPair(range, rangeStart.line, parent2, previousRange, previousRangeStartLine, previousParent, contextNode, dynamicIndentation);
                    }
                }
                previousRange = range;
                previousRangeTriviaEnd = range.end;
                previousParent = parent2;
                previousRangeStartLine = rangeStart.line;
                return lineAction;
            }
            function processPair(currentItem, currentStartLine, currentParent, previousItem, previousStartLine, previousParent2, contextNode, dynamicIndentation) {
                formattingContext.updateContext(previousItem, previousParent2, currentItem, currentParent, contextNode);
                const rules = getRules(formattingContext);
                let trimTrailingWhitespaces = formattingContext.options.trimTrailingWhitespace !== false;
                let lineAction = 0 /* None */;
                if (rules) {
                    forEachRight(rules, (rule2) => {
                        lineAction = applyRuleEdits(rule2, previousItem, previousStartLine, currentItem, currentStartLine);
                        if (dynamicIndentation) {
                            switch (lineAction) {
                                case 2 /* LineRemoved */:
                                    if (currentParent.getStart(sourceFile) === currentItem.pos) {
                                        dynamicIndentation.recomputeIndentation(
                                        /*lineAddedByFormatting*/
                                        false, contextNode);
                                    }
                                    break;
                                case 1 /* LineAdded */:
                                    if (currentParent.getStart(sourceFile) === currentItem.pos) {
                                        dynamicIndentation.recomputeIndentation(
                                        /*lineAddedByFormatting*/
                                        true, contextNode);
                                    }
                                    break;
                                default:
                                    Debug.assert(lineAction === 0 /* None */);
                            }
                        }
                        trimTrailingWhitespaces = trimTrailingWhitespaces && !(rule2.action & 16 /* DeleteSpace */) && rule2.flags !== 1 /* CanDeleteNewLines */;
                    });
                }
                else {
                    trimTrailingWhitespaces = trimTrailingWhitespaces && currentItem.kind !== 1 /* EndOfFileToken */;
                }
                if (currentStartLine !== previousStartLine && trimTrailingWhitespaces) {
                    trimTrailingWhitespacesForLines(previousStartLine, currentStartLine, previousItem);
                }
                return lineAction;
            }
            function insertIndentation(pos, indentation, lineAdded) {
                const indentationString = getIndentationString(indentation, options);
                if (lineAdded) {
                    recordReplace(pos, 0, indentationString);
                }
                else {
                    const tokenStart = sourceFile.getLineAndCharacterOfPosition(pos);
                    const startLinePosition = getStartPositionOfLine(tokenStart.line, sourceFile);
                    if (indentation !== characterToColumn(startLinePosition, tokenStart.character) || indentationIsDifferent(indentationString, startLinePosition)) {
                        recordReplace(startLinePosition, tokenStart.character, indentationString);
                    }
                }
            }
            function characterToColumn(startLinePosition, characterInLine) {
                let column = 0;
                for (let i = 0; i < characterInLine; i++) {
                    if (sourceFile.text.charCodeAt(startLinePosition + i) === 9 /* tab */) {
                        column += options.tabSize - column % options.tabSize;
                    }
                    else {
                        column++;
                    }
                }
                return column;
            }
            function indentationIsDifferent(indentationString, startLinePosition) {
                return indentationString !== sourceFile.text.substr(startLinePosition, indentationString.length);
            }
            function indentMultilineComment(commentRange, indentation, firstLineIsIndented, indentFinalLine = true) {
                let startLine = sourceFile.getLineAndCharacterOfPosition(commentRange.pos).line;
                const endLine = sourceFile.getLineAndCharacterOfPosition(commentRange.end).line;
                if (startLine === endLine) {
                    if (!firstLineIsIndented) {
                        insertIndentation(commentRange.pos, indentation, 
                        /*lineAdded*/
                        false);
                    }
                    return;
                }
                const parts = [];
                let startPos = commentRange.pos;
                for (let line = startLine; line < endLine; line++) {
                    const endOfLine = getEndLinePosition(line, sourceFile);
                    parts.push({ pos: startPos, end: endOfLine });
                    startPos = getStartPositionOfLine(line + 1, sourceFile);
                }
                if (indentFinalLine) {
                    parts.push({ pos: startPos, end: commentRange.end });
                }
                if (parts.length === 0)
                    return;
                const startLinePos = getStartPositionOfLine(startLine, sourceFile);
                const nonWhitespaceColumnInFirstPart = SmartIndenter.findFirstNonWhitespaceCharacterAndColumn(startLinePos, parts[0].pos, sourceFile, options);
                let startIndex = 0;
                if (firstLineIsIndented) {
                    startIndex = 1;
                    startLine++;
                }
                const delta2 = indentation - nonWhitespaceColumnInFirstPart.column;
                for (let i = startIndex; i < parts.length; i++, startLine++) {
                    const startLinePos2 = getStartPositionOfLine(startLine, sourceFile);
                    const nonWhitespaceCharacterAndColumn = i === 0 ? nonWhitespaceColumnInFirstPart : SmartIndenter.findFirstNonWhitespaceCharacterAndColumn(parts[i].pos, parts[i].end, sourceFile, options);
                    const newIndentation = nonWhitespaceCharacterAndColumn.column + delta2;
                    if (newIndentation > 0) {
                        const indentationString = getIndentationString(newIndentation, options);
                        recordReplace(startLinePos2, nonWhitespaceCharacterAndColumn.character, indentationString);
                    }
                    else {
                        recordDelete(startLinePos2, nonWhitespaceCharacterAndColumn.character);
                    }
                }
            }
            function trimTrailingWhitespacesForLines(line1, line2, range) {
                for (let line = line1; line < line2; line++) {
                    const lineStartPosition = getStartPositionOfLine(line, sourceFile);
                    const lineEndPosition = getEndLinePosition(line, sourceFile);
                    if (range && (isComment(range.kind) || isStringOrRegularExpressionOrTemplateLiteral(range.kind)) && range.pos <= lineEndPosition && range.end > lineEndPosition) {
                        continue;
                    }
                    const whitespaceStart = getTrailingWhitespaceStartPosition(lineStartPosition, lineEndPosition);
                    if (whitespaceStart !== -1) {
                        Debug.assert(whitespaceStart === lineStartPosition || !isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(whitespaceStart - 1)));
                        recordDelete(whitespaceStart, lineEndPosition + 1 - whitespaceStart);
                    }
                }
            }
            function getTrailingWhitespaceStartPosition(start, end) {
                let pos = end;
                while (pos >= start && isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(pos))) {
                    pos--;
                }
                if (pos !== end) {
                    return pos + 1;
                }
                return -1;
            }
            function trimTrailingWhitespacesForRemainingRange(trivias) {
                let startPos = previousRange ? previousRange.end : originalRange.pos;
                for (const trivia of trivias) {
                    if (isComment(trivia.kind)) {
                        if (startPos < trivia.pos) {
                            trimTrailingWitespacesForPositions(startPos, trivia.pos - 1, previousRange);
                        }
                        startPos = trivia.end + 1;
                    }
                }
                if (startPos < originalRange.end) {
                    trimTrailingWitespacesForPositions(startPos, originalRange.end, previousRange);
                }
            }
            function trimTrailingWitespacesForPositions(startPos, endPos, previousRange2) {
                const startLine = sourceFile.getLineAndCharacterOfPosition(startPos).line;
                const endLine = sourceFile.getLineAndCharacterOfPosition(endPos).line;
                trimTrailingWhitespacesForLines(startLine, endLine + 1, previousRange2);
            }
            function recordDelete(start, len) {
                if (len) {
                    edits.push(createTextChangeFromStartLength(start, len, ""));
                }
            }
            function recordReplace(start, len, newText) {
                if (len || newText) {
                    edits.push(createTextChangeFromStartLength(start, len, newText));
                }
            }
            function recordInsert(start, text) {
                if (text) {
                    edits.push(createTextChangeFromStartLength(start, 0, text));
                }
            }
            function applyRuleEdits(rule2, previousRange2, previousStartLine, currentRange, currentStartLine) {
                const onLaterLine = currentStartLine !== previousStartLine;
                switch (rule2.action) {
                    case 1 /* StopProcessingSpaceActions */:
                        return 0 /* None */;
                    case 16 /* DeleteSpace */:
                        if (previousRange2.end !== currentRange.pos) {
                            recordDelete(previousRange2.end, currentRange.pos - previousRange2.end);
                            return onLaterLine ? 2 /* LineRemoved */ : 0 /* None */;
                        }
                        break;
                    case 32 /* DeleteToken */:
                        recordDelete(previousRange2.pos, previousRange2.end - previousRange2.pos);
                        break;
                    case 8 /* InsertNewLine */:
                        if (rule2.flags !== 1 /* CanDeleteNewLines */ && previousStartLine !== currentStartLine) {
                            return 0 /* None */;
                        }
                        const lineDelta = currentStartLine - previousStartLine;
                        if (lineDelta !== 1) {
                            recordReplace(previousRange2.end, currentRange.pos - previousRange2.end, getNewLineOrDefaultFromHost(host, options));
                            return onLaterLine ? 0 /* None */ : 1 /* LineAdded */;
                        }
                        break;
                    case 4 /* InsertSpace */:
                        if (rule2.flags !== 1 /* CanDeleteNewLines */ && previousStartLine !== currentStartLine) {
                            return 0 /* None */;
                        }
                        const posDelta = currentRange.pos - previousRange2.end;
                        if (posDelta !== 1 || sourceFile.text.charCodeAt(previousRange2.end) !== 32 /* space */) {
                            recordReplace(previousRange2.end, currentRange.pos - previousRange2.end, " ");
                            return onLaterLine ? 2 /* LineRemoved */ : 0 /* None */;
                        }
                        break;
                    case 64 /* InsertTrailingSemicolon */:
                        recordInsert(previousRange2.end, ";");
                }
                return 0 /* None */;
            }
        }