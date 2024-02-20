function parseNestedTypeLiteral(typeExpression, name, target, indent2) {
                                if (typeExpression && isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                                    const pos = getNodePos();
                                    let child;
                                    let children;
                                    while (child = tryParse(() => parseChildParameterOrPropertyTag(target, indent2, name))) {
                                        if (child.kind === 344 /* JSDocParameterTag */ || child.kind === 351 /* JSDocPropertyTag */) {
                                            children = append(children, child);
                                        }
                                    }
                                    if (children) {
                                        const literal = finishNode(factory2.createJSDocTypeLiteral(children, typeExpression.type.kind === 185 /* ArrayType */), pos);
                                        return finishNode(factory2.createJSDocTypeExpression(literal), pos);
                                    }
                                }
                            }