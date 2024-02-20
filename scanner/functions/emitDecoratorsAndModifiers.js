function emitDecoratorsAndModifiers(node, modifiers, allowDecorators) {
                if (modifiers == null ? void 0 : modifiers.length) {
                    if (every(modifiers, isModifier)) {
                        return emitModifierList(node, modifiers);
                    }
                    if (every(modifiers, isDecorator)) {
                        if (allowDecorators) {
                            return emitDecoratorList(node, modifiers);
                        }
                        return node.pos;
                    }
                    onBeforeEmitNodeArray == null ? void 0 : onBeforeEmitNodeArray(modifiers);
                    let lastMode;
                    let mode;
                    let start = 0;
                    let pos = 0;
                    let lastModifier;
                    while (start < modifiers.length) {
                        while (pos < modifiers.length) {
                            lastModifier = modifiers[pos];
                            mode = isDecorator(lastModifier) ? "decorators" : "modifiers";
                            if (lastMode === void 0) {
                                lastMode = mode;
                            }
                            else if (mode !== lastMode) {
                                break;
                            }
                            pos++;
                        }
                        const textRange = { pos: -1, end: -1 };
                        if (start === 0)
                            textRange.pos = modifiers.pos;
                        if (pos === modifiers.length - 1)
                            textRange.end = modifiers.end;
                        if (lastMode === "modifiers" || allowDecorators) {
                            emitNodeListItems(emit, node, modifiers, lastMode === "modifiers" ? 2359808 /* Modifiers */ : 2146305 /* Decorators */, 
                            /*parenthesizerRule*/
                            void 0, start, pos - start, 
                            /*hasTrailingComma*/
                            false, textRange);
                        }
                        start = pos;
                        lastMode = mode;
                        pos++;
                    }
                    onAfterEmitNodeArray == null ? void 0 : onAfterEmitNodeArray(modifiers);
                    if (lastModifier && !positionIsSynthesized(lastModifier.end)) {
                        return lastModifier.end;
                    }
                }
                return node.pos;
            }