function getSymbolParentOrFail(symbol) {
            var _a2;
            return Debug.checkDefined(symbol.parent, `Symbol parent was undefined. Flags: ${Debug.formatSymbolFlags(symbol.flags)}. Declarations: ${(_a2 = symbol.declarations) == null ? void 0 : _a2.map((d) => {
                const kind = Debug.formatSyntaxKind(d.kind);
                const inJS = isInJSFile(d);
                const { expression } = d;
                return (inJS ? "[JS]" : "") + kind + (expression ? ` (expression: ${Debug.formatSyntaxKind(expression.kind)})` : "");
            }).join(", ")}.`);
        }