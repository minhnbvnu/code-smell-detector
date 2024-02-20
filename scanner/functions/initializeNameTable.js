function initializeNameTable(sourceFile) {
            const nameTable = sourceFile.nameTable = /* @__PURE__ */ new Map();
            sourceFile.forEachChild(function walk(node) {
                if (isIdentifier(node) && !isTagName(node) && node.escapedText || isStringOrNumericLiteralLike(node) && literalIsName(node)) {
                    const text = getEscapedTextOfIdentifierOrLiteral(node);
                    nameTable.set(text, nameTable.get(text) === void 0 ? node.pos : -1);
                }
                else if (isPrivateIdentifier(node)) {
                    const text = node.escapedText;
                    nameTable.set(text, nameTable.get(text) === void 0 ? node.pos : -1);
                }
                forEachChild(node, walk);
                if (hasJSDocNodes(node)) {
                    for (const jsDoc of node.jsDoc) {
                        forEachChild(jsDoc, walk);
                    }
                }
            });
        }