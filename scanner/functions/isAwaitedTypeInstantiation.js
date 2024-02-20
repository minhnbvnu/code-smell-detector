function isAwaitedTypeInstantiation(type) {
                var _a2;
                if (type.flags & 16777216 /* Conditional */) {
                    const awaitedSymbol = getGlobalAwaitedSymbol(
                    /*reportErrors*/
                    false);
                    return !!awaitedSymbol && type.aliasSymbol === awaitedSymbol && ((_a2 = type.aliasTypeArguments) == null ? void 0 : _a2.length) === 1;
                }
                return false;
            }