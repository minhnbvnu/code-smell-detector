function parseDeclaration() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const modifiers = parseModifiers(
                        /*allowDecorators*/
                        true);
                        const isAmbient = some(modifiers, isDeclareModifier);
                        if (isAmbient) {
                            const node = tryReuseAmbientDeclaration(pos);
                            if (node) {
                                return node;
                            }
                            for (const m of modifiers) {
                                m.flags |= 16777216 /* Ambient */;
                            }
                            return doInsideOfContext(16777216 /* Ambient */, () => parseDeclarationWorker(pos, hasJSDoc, modifiers));
                        }
                        else {
                            return parseDeclarationWorker(pos, hasJSDoc, modifiers);
                        }
                    }