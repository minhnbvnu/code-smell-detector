function getJsDocTagsOfDeclarations(declarations, checker) {
            if (!declarations)
                return emptyArray;
            let tags = ts_JsDoc_exports.getJsDocTagsFromDeclarations(declarations, checker);
            if (checker && (tags.length === 0 || declarations.some(hasJSDocInheritDocTag))) {
                const seenSymbols = /* @__PURE__ */ new Set();
                for (const declaration of declarations) {
                    const inheritedTags = findBaseOfDeclaration(checker, declaration, (symbol) => {
                        var _a2;
                        if (!seenSymbols.has(symbol)) {
                            seenSymbols.add(symbol);
                            if (declaration.kind === 174 /* GetAccessor */ || declaration.kind === 175 /* SetAccessor */) {
                                return symbol.getContextualJsDocTags(declaration, checker);
                            }
                            return ((_a2 = symbol.declarations) == null ? void 0 : _a2.length) === 1 ? symbol.getJsDocTags() : void 0;
                        }
                    });
                    if (inheritedTags) {
                        tags = [...inheritedTags, ...tags];
                    }
                }
            }
            return tags;
        }