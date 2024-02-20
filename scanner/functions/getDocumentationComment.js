function getDocumentationComment(declarations, checker) {
            if (!declarations)
                return emptyArray;
            let doc = ts_JsDoc_exports.getJsDocCommentsFromDeclarations(declarations, checker);
            if (checker && (doc.length === 0 || declarations.some(hasJSDocInheritDocTag))) {
                const seenSymbols = /* @__PURE__ */ new Set();
                for (const declaration of declarations) {
                    const inheritedDocs = findBaseOfDeclaration(checker, declaration, (symbol) => {
                        if (!seenSymbols.has(symbol)) {
                            seenSymbols.add(symbol);
                            if (declaration.kind === 174 /* GetAccessor */ || declaration.kind === 175 /* SetAccessor */) {
                                return symbol.getContextualDocumentationComment(declaration, checker);
                            }
                            return symbol.getDocumentationComment(checker);
                        }
                    });
                    if (inheritedDocs)
                        doc = doc.length === 0 ? inheritedDocs.slice() : inheritedDocs.concat(lineBreakPart(), doc);
                }
            }
            return doc;
        }