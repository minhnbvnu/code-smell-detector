function isModuleSymbol(symbol) {
            var _a2;
            return !!((_a2 = symbol.declarations) == null ? void 0 : _a2.some((d) => d.kind === 308 /* SourceFile */));
        }