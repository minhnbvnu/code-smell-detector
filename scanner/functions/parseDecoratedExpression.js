function parseDecoratedExpression() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const modifiers = parseModifiers(
                        /*allowDecorators*/
                        true);
                        if (token() === 84 /* ClassKeyword */) {
                            return parseClassDeclarationOrExpression(pos, hasJSDoc, modifiers, 228 /* ClassExpression */);
                        }
                        const missing = createMissingNode(279 /* MissingDeclaration */, 
                        /*reportAtCurrentPosition*/
                        true, Diagnostics.Expression_expected);
                        setTextRangePos(missing, pos);
                        missing.modifiers = modifiers;
                        return missing;
                    }