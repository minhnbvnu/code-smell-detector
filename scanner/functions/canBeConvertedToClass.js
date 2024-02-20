function canBeConvertedToClass(node, checker) {
            var _a2, _b, _c, _d;
            if (isFunctionExpression(node)) {
                if (isVariableDeclaration(node.parent) && ((_a2 = node.symbol.members) == null ? void 0 : _a2.size)) {
                    return true;
                }
                const symbol = checker.getSymbolOfExpando(node, 
                /*allowDeclaration*/
                false);
                return !!(symbol && (((_b = symbol.exports) == null ? void 0 : _b.size) || ((_c = symbol.members) == null ? void 0 : _c.size)));
            }
            if (isFunctionDeclaration(node)) {
                return !!((_d = node.symbol.members) == null ? void 0 : _d.size);
            }
            return false;
        }