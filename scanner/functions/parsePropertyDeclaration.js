function parsePropertyDeclaration(pos, hasJSDoc, modifiers, name, questionToken) {
                        const exclamationToken = !questionToken && !scanner2.hasPrecedingLineBreak() ? parseOptionalToken(53 /* ExclamationToken */) : void 0;
                        const type = parseTypeAnnotation();
                        const initializer = doOutsideOfContext(8192 /* YieldContext */ | 32768 /* AwaitContext */ | 4096 /* DisallowInContext */, parseInitializer);
                        parseSemicolonAfterPropertyName(name, type, initializer);
                        const node = factory2.createPropertyDeclaration(modifiers, name, questionToken || exclamationToken, type, initializer);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }