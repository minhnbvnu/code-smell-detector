function getJSContainerObjectType(decl, symbol, init) {
                var _a2, _b;
                if (!isInJSFile(decl) || !init || !isObjectLiteralExpression(init) || init.properties.length) {
                    return void 0;
                }
                const exports = createSymbolTable();
                while (isBinaryExpression(decl) || isPropertyAccessExpression(decl)) {
                    const s2 = getSymbolOfNode(decl);
                    if ((_a2 = s2 == null ? void 0 : s2.exports) == null ? void 0 : _a2.size) {
                        mergeSymbolTable(exports, s2.exports);
                    }
                    decl = isBinaryExpression(decl) ? decl.parent : decl.parent.parent;
                }
                const s = getSymbolOfNode(decl);
                if ((_b = s == null ? void 0 : s.exports) == null ? void 0 : _b.size) {
                    mergeSymbolTable(exports, s.exports);
                }
                const type = createAnonymousType(symbol, exports, emptyArray, emptyArray, emptyArray);
                type.objectFlags |= 4096 /* JSLiteral */;
                return type;
            }