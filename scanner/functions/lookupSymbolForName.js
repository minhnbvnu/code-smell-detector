function lookupSymbolForName(container, name) {
            var _a2, _b, _c, _d, _e;
            const local = (_b = (_a2 = tryCast(container, canHaveLocals)) == null ? void 0 : _a2.locals) == null ? void 0 : _b.get(name);
            if (local) {
                return (_c = local.exportSymbol) != null ? _c : local;
            }
            if (isSourceFile(container) && container.jsGlobalAugmentations && container.jsGlobalAugmentations.has(name)) {
                return container.jsGlobalAugmentations.get(name);
            }
            if (canHaveSymbol(container)) {
                return (_e = (_d = container.symbol) == null ? void 0 : _d.exports) == null ? void 0 : _e.get(name);
            }
        }