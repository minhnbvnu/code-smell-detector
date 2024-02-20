function getContextualType2(node, contextFlags) {
                var _a2, _b;
                if (node.flags & 33554432 /* InWithStatement */) {
                    return void 0;
                }
                const index = findContextualNode(node, 
                /*includeCaches*/
                !contextFlags);
                if (index >= 0) {
                    return contextualTypes[index];
                }
                const { parent: parent2 } = node;
                switch (parent2.kind) {
                    case 257 /* VariableDeclaration */:
                    case 166 /* Parameter */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                    case 205 /* BindingElement */:
                        return getContextualTypeForInitializerExpression(node, contextFlags);
                    case 216 /* ArrowFunction */:
                    case 250 /* ReturnStatement */:
                        return getContextualTypeForReturnExpression(node, contextFlags);
                    case 226 /* YieldExpression */:
                        return getContextualTypeForYieldOperand(parent2, contextFlags);
                    case 220 /* AwaitExpression */:
                        return getContextualTypeForAwaitOperand(parent2, contextFlags);
                    case 210 /* CallExpression */:
                    case 211 /* NewExpression */:
                        return getContextualTypeForArgument(parent2, node);
                    case 167 /* Decorator */:
                        return getContextualTypeForDecorator(parent2);
                    case 213 /* TypeAssertionExpression */:
                    case 231 /* AsExpression */:
                        return isConstTypeReference(parent2.type) ? getContextualType2(parent2, contextFlags) : getTypeFromTypeNode(parent2.type);
                    case 223 /* BinaryExpression */:
                        return getContextualTypeForBinaryOperand(node, contextFlags);
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                        return getContextualTypeForObjectLiteralElement(parent2, contextFlags);
                    case 301 /* SpreadAssignment */:
                        return getContextualType2(parent2.parent, contextFlags);
                    case 206 /* ArrayLiteralExpression */: {
                        const arrayLiteral = parent2;
                        const type = getApparentTypeOfContextualType(arrayLiteral, contextFlags);
                        const spreadIndex = (_b = (_a2 = getNodeLinks(arrayLiteral)).firstSpreadIndex) != null ? _b : _a2.firstSpreadIndex = findIndex(arrayLiteral.elements, isSpreadElement);
                        const elementIndex = indexOfNode(arrayLiteral.elements, node);
                        return getContextualTypeForElementExpression(type, spreadIndex < 0 || elementIndex < spreadIndex ? elementIndex : -1);
                    }
                    case 224 /* ConditionalExpression */:
                        return getContextualTypeForConditionalOperand(node, contextFlags);
                    case 236 /* TemplateSpan */:
                        Debug.assert(parent2.parent.kind === 225 /* TemplateExpression */);
                        return getContextualTypeForSubstitutionExpression(parent2.parent, node);
                    case 214 /* ParenthesizedExpression */: {
                        if (isInJSFile(parent2)) {
                            if (isJSDocSatisfiesExpression(parent2)) {
                                return getTypeFromTypeNode(getJSDocSatisfiesExpressionType(parent2));
                            }
                            const typeTag = getJSDocTypeTag(parent2);
                            if (typeTag && !isConstTypeReference(typeTag.typeExpression.type)) {
                                return getTypeFromTypeNode(typeTag.typeExpression.type);
                            }
                        }
                        return getContextualType2(parent2, contextFlags);
                    }
                    case 232 /* NonNullExpression */:
                        return getContextualType2(parent2, contextFlags);
                    case 235 /* SatisfiesExpression */:
                        return getTypeFromTypeNode(parent2.type);
                    case 274 /* ExportAssignment */:
                        return tryGetTypeFromEffectiveTypeNode(parent2);
                    case 291 /* JsxExpression */:
                        return getContextualTypeForJsxExpression(parent2, contextFlags);
                    case 288 /* JsxAttribute */:
                    case 290 /* JsxSpreadAttribute */:
                        return getContextualTypeForJsxAttribute(parent2, contextFlags);
                    case 283 /* JsxOpeningElement */:
                    case 282 /* JsxSelfClosingElement */:
                        return getContextualJsxElementAttributesType(parent2, contextFlags);
                }
                return void 0;
            }