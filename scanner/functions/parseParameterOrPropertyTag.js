function parseParameterOrPropertyTag(start2, tagName, target, indent2) {
                                let typeExpression = tryParseTypeExpression();
                                let isNameFirst = !typeExpression;
                                skipWhitespaceOrAsterisk();
                                const { name, isBracketed } = parseBracketNameInPropertyAndParamTag();
                                const indentText = skipWhitespaceOrAsterisk();
                                if (isNameFirst && !lookAhead(parseJSDocLinkPrefix)) {
                                    typeExpression = tryParseTypeExpression();
                                }
                                const comment = parseTrailingTagComments(start2, getNodePos(), indent2, indentText);
                                const nestedTypeLiteral = target !== 4 /* CallbackParameter */ && parseNestedTypeLiteral(typeExpression, name, target, indent2);
                                if (nestedTypeLiteral) {
                                    typeExpression = nestedTypeLiteral;
                                    isNameFirst = true;
                                }
                                const result = target === 1 /* Property */ ? factory2.createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment) : factory2.createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment);
                                return finishNode(result, start2);
                            }