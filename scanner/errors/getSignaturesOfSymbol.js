function getSignaturesOfSymbol(symbol) {
                if (!symbol || !symbol.declarations)
                    return emptyArray;
                const result = [];
                for (let i = 0; i < symbol.declarations.length; i++) {
                    const decl = symbol.declarations[i];
                    if (!isFunctionLike(decl))
                        continue;
                    if (i > 0 && decl.body) {
                        const previous = symbol.declarations[i - 1];
                        if (decl.parent === previous.parent && decl.kind === previous.kind && decl.pos === previous.end) {
                            continue;
                        }
                    }
                    if (isInJSFile(decl) && decl.jsDoc) {
                        let hasJSDocOverloads = false;
                        for (const node of decl.jsDoc) {
                            if (node.tags) {
                                for (const tag of node.tags) {
                                    if (isJSDocOverloadTag(tag)) {
                                        const jsDocSignature = tag.typeExpression;
                                        if (jsDocSignature.type === void 0 && !isConstructorDeclaration(decl)) {
                                            reportImplicitAny(jsDocSignature, anyType);
                                        }
                                        result.push(getSignatureFromDeclaration(jsDocSignature));
                                        hasJSDocOverloads = true;
                                    }
                                }
                            }
                        }
                        if (hasJSDocOverloads) {
                            continue;
                        }
                    }
                    result.push(!isFunctionExpressionOrArrowFunction(decl) && !isObjectLiteralMethod(decl) && getSignatureOfTypeTag(decl) || getSignatureFromDeclaration(decl));
                }
                return result;
            }