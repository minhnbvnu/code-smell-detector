function isMatchingReference(source, target) {
                switch (target.kind) {
                    case 214 /* ParenthesizedExpression */:
                    case 232 /* NonNullExpression */:
                        return isMatchingReference(source, target.expression);
                    case 223 /* BinaryExpression */:
                        return isAssignmentExpression(target) && isMatchingReference(source, target.left) || isBinaryExpression(target) && target.operatorToken.kind === 27 /* CommaToken */ && isMatchingReference(source, target.right);
                }
                switch (source.kind) {
                    case 233 /* MetaProperty */:
                        return target.kind === 233 /* MetaProperty */ && source.keywordToken === target.keywordToken && source.name.escapedText === target.name.escapedText;
                    case 79 /* Identifier */:
                    case 80 /* PrivateIdentifier */:
                        return isThisInTypeQuery(source) ? target.kind === 108 /* ThisKeyword */ : target.kind === 79 /* Identifier */ && getResolvedSymbol(source) === getResolvedSymbol(target) || (isVariableDeclaration(target) || isBindingElement(target)) && getExportSymbolOfValueSymbolIfExported(getResolvedSymbol(source)) === getSymbolOfDeclaration(target);
                    case 108 /* ThisKeyword */:
                        return target.kind === 108 /* ThisKeyword */;
                    case 106 /* SuperKeyword */:
                        return target.kind === 106 /* SuperKeyword */;
                    case 232 /* NonNullExpression */:
                    case 214 /* ParenthesizedExpression */:
                        return isMatchingReference(source.expression, target);
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        const sourcePropertyName = getAccessedPropertyName(source);
                        const targetPropertyName = isAccessExpression(target) ? getAccessedPropertyName(target) : void 0;
                        return sourcePropertyName !== void 0 && targetPropertyName !== void 0 && targetPropertyName === sourcePropertyName && isMatchingReference(source.expression, target.expression);
                    case 163 /* QualifiedName */:
                        return isAccessExpression(target) && source.right.escapedText === getAccessedPropertyName(target) && isMatchingReference(source.left, target.expression);
                    case 223 /* BinaryExpression */:
                        return isBinaryExpression(source) && source.operatorToken.kind === 27 /* CommaToken */ && isMatchingReference(source.right, target);
                }
                return false;
            }