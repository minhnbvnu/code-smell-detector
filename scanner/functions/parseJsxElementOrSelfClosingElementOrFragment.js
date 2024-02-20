function parseJsxElementOrSelfClosingElementOrFragment(inExpressionContext, topInvalidNodePosition, openingTag, mustBeUnary = false) {
                        const pos = getNodePos();
                        const opening = parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext);
                        let result;
                        if (opening.kind === 283 /* JsxOpeningElement */) {
                            let children = parseJsxChildren(opening);
                            let closingElement;
                            const lastChild = children[children.length - 1];
                            if ((lastChild == null ? void 0 : lastChild.kind) === 281 /* JsxElement */ && !tagNamesAreEquivalent(lastChild.openingElement.tagName, lastChild.closingElement.tagName) && tagNamesAreEquivalent(opening.tagName, lastChild.closingElement.tagName)) {
                                const end = lastChild.children.end;
                                const newLast = finishNode(factory2.createJsxElement(lastChild.openingElement, lastChild.children, finishNode(factory2.createJsxClosingElement(finishNode(factoryCreateIdentifier(""), end, end)), end, end)), lastChild.openingElement.pos, end);
                                children = createNodeArray([...children.slice(0, children.length - 1), newLast], children.pos, end);
                                closingElement = lastChild.closingElement;
                            }
                            else {
                                closingElement = parseJsxClosingElement(opening, inExpressionContext);
                                if (!tagNamesAreEquivalent(opening.tagName, closingElement.tagName)) {
                                    if (openingTag && isJsxOpeningElement(openingTag) && tagNamesAreEquivalent(closingElement.tagName, openingTag.tagName)) {
                                        parseErrorAtRange(opening.tagName, Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, getTextOfNodeFromSourceText(sourceText, opening.tagName));
                                    }
                                    else {
                                        parseErrorAtRange(closingElement.tagName, Diagnostics.Expected_corresponding_JSX_closing_tag_for_0, getTextOfNodeFromSourceText(sourceText, opening.tagName));
                                    }
                                }
                            }
                            result = finishNode(factory2.createJsxElement(opening, children, closingElement), pos);
                        }
                        else if (opening.kind === 286 /* JsxOpeningFragment */) {
                            result = finishNode(factory2.createJsxFragment(opening, parseJsxChildren(opening), parseJsxClosingFragment(inExpressionContext)), pos);
                        }
                        else {
                            Debug.assert(opening.kind === 282 /* JsxSelfClosingElement */);
                            result = opening;
                        }
                        if (!mustBeUnary && inExpressionContext && token() === 29 /* LessThanToken */) {
                            const topBadPos = typeof topInvalidNodePosition === "undefined" ? result.pos : topInvalidNodePosition;
                            const invalidElement = tryParse(() => parseJsxElementOrSelfClosingElementOrFragment(
                            /*inExpressionContext*/
                            true, topBadPos));
                            if (invalidElement) {
                                const operatorToken = createMissingNode(27 /* CommaToken */, 
                                /*reportAtCurrentPosition*/
                                false);
                                setTextRangePosWidth(operatorToken, invalidElement.pos, 0);
                                parseErrorAt(skipTrivia(sourceText, topBadPos), invalidElement.end, Diagnostics.JSX_expressions_must_have_one_parent_element);
                                return finishNode(factory2.createBinaryExpression(result, operatorToken, invalidElement), pos);
                            }
                        }
                        return result;
                    }