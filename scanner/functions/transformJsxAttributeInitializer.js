function transformJsxAttributeInitializer(node) {
                if (node === void 0) {
                    return factory2.createTrue();
                }
                if (node.kind === 10 /* StringLiteral */) {
                    const singleQuote = node.singleQuote !== void 0 ? node.singleQuote : !isStringDoubleQuoted(node, currentSourceFile);
                    const literal = factory2.createStringLiteral(tryDecodeEntities(node.text) || node.text, singleQuote);
                    return setTextRange(literal, node);
                }
                if (node.kind === 291 /* JsxExpression */) {
                    if (node.expression === void 0) {
                        return factory2.createTrue();
                    }
                    return Debug.checkDefined(visitNode(node.expression, visitor, isExpression));
                }
                if (isJsxElement(node)) {
                    return visitJsxElement(node, 
                    /*isChild*/
                    false);
                }
                if (isJsxSelfClosingElement(node)) {
                    return visitJsxSelfClosingElement(node, 
                    /*isChild*/
                    false);
                }
                if (isJsxFragment(node)) {
                    return visitJsxFragment(node, 
                    /*isChild*/
                    false);
                }
                return Debug.failBadSyntaxKind(node);
            }