function getSmartSelectionRange(pos, sourceFile) {
            var _a2, _b;
            let selectionRange = {
                textSpan: createTextSpanFromBounds(sourceFile.getFullStart(), sourceFile.getEnd())
            };
            let parentNode = sourceFile;
            outer: while (true) {
                const children = getSelectionChildren(parentNode);
                if (!children.length)
                    break;
                for (let i = 0; i < children.length; i++) {
                    const prevNode = children[i - 1];
                    const node = children[i];
                    const nextNode = children[i + 1];
                    if (getTokenPosOfNode(node, sourceFile, 
                    /*includeJsDoc*/
                    true) > pos) {
                        break outer;
                    }
                    const comment = singleOrUndefined(getTrailingCommentRanges(sourceFile.text, node.end));
                    if (comment && comment.kind === 2 /* SingleLineCommentTrivia */) {
                        pushSelectionCommentRange(comment.pos, comment.end);
                    }
                    if (positionShouldSnapToNode(sourceFile, pos, node)) {
                        if (isFunctionBody(node) && isFunctionLikeDeclaration(parentNode) && !positionsAreOnSameLine(node.getStart(sourceFile), node.getEnd(), sourceFile)) {
                            pushSelectionRange(node.getStart(sourceFile), node.getEnd());
                        }
                        if (isBlock(node) || isTemplateSpan(node) || isTemplateHead(node) || isTemplateTail(node) || prevNode && isTemplateHead(prevNode) || isVariableDeclarationList(node) && isVariableStatement(parentNode) || isSyntaxList(node) && isVariableDeclarationList(parentNode) || isVariableDeclaration(node) && isSyntaxList(parentNode) && children.length === 1 || isJSDocTypeExpression(node) || isJSDocSignature(node) || isJSDocTypeLiteral(node)) {
                            parentNode = node;
                            break;
                        }
                        if (isTemplateSpan(parentNode) && nextNode && isTemplateMiddleOrTemplateTail(nextNode)) {
                            const start2 = node.getFullStart() - "${".length;
                            const end2 = nextNode.getStart() + "}".length;
                            pushSelectionRange(start2, end2);
                        }
                        const isBetweenMultiLineBookends = isSyntaxList(node) && isListOpener(prevNode) && isListCloser(nextNode) && !positionsAreOnSameLine(prevNode.getStart(), nextNode.getStart(), sourceFile);
                        let start = isBetweenMultiLineBookends ? prevNode.getEnd() : node.getStart();
                        const end = isBetweenMultiLineBookends ? nextNode.getStart() : getEndPos(sourceFile, node);
                        if (hasJSDocNodes(node) && ((_a2 = node.jsDoc) == null ? void 0 : _a2.length)) {
                            pushSelectionRange(first(node.jsDoc).getStart(), end);
                        }
                        if (isSyntaxList(node)) {
                            const firstChild = node.getChildren()[0];
                            if (firstChild && hasJSDocNodes(firstChild) && ((_b = firstChild.jsDoc) == null ? void 0 : _b.length) && firstChild.getStart() !== node.pos) {
                                start = Math.min(start, first(firstChild.jsDoc).getStart());
                            }
                        }
                        pushSelectionRange(start, end);
                        if (isStringLiteral(node) || isTemplateLiteral(node)) {
                            pushSelectionRange(start + 1, end - 1);
                        }
                        parentNode = node;
                        break;
                    }
                    if (i === children.length - 1) {
                        break outer;
                    }
                }
            }
            return selectionRange;
            function pushSelectionRange(start, end) {
                if (start !== end) {
                    const textSpan = createTextSpanFromBounds(start, end);
                    if (!selectionRange || // Skip ranges that are identical to the parent
                        !textSpansEqual(textSpan, selectionRange.textSpan) && // Skip ranges that don’t contain the original position
                            textSpanIntersectsWithPosition(textSpan, pos)) {
                        selectionRange = { textSpan, ...selectionRange && { parent: selectionRange } };
                    }
                }
            }
            function pushSelectionCommentRange(start, end) {
                pushSelectionRange(start, end);
                let pos2 = start;
                while (sourceFile.text.charCodeAt(pos2) === 47 /* slash */) {
                    pos2++;
                }
                pushSelectionRange(pos2, end);
            }
        }