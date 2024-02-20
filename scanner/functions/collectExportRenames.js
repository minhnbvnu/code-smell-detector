function collectExportRenames(sourceFile, checker, identifiers) {
            const res = /* @__PURE__ */ new Map();
            forEachExportReference(sourceFile, (node) => {
                const { text } = node.name;
                if (!res.has(text) && (isIdentifierANonContextualKeyword(node.name) || checker.resolveName(text, node, 111551 /* Value */, 
                /*excludeGlobals*/
                true))) {
                    res.set(text, makeUniqueName(`_${text}`, identifiers));
                }
            });
            return res;
        }