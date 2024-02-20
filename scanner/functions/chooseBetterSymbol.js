function chooseBetterSymbol(s) {
            return s.name === "__type" /* Type */ ? firstDefined(s.declarations, (d) => {
                var _a2;
                return isFunctionTypeNode(d) ? (_a2 = tryCast(d.parent, canHaveSymbol)) == null ? void 0 : _a2.symbol : void 0;
            }) || s : s;
        }