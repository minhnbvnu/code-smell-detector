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