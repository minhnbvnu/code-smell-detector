function isAliasResolvedToValue(symbol) {
                var _a2;
                if (!symbol) {
                    return false;
                }
                const target = getExportSymbolOfValueSymbolIfExported(resolveAlias(symbol));
                if (target === unknownSymbol) {
                    return true;
                }
                return !!(((_a2 = getAllSymbolFlags(target)) != null ? _a2 : -1) & 111551 /* Value */) && (shouldPreserveConstEnums(compilerOptions) || !isConstEnumOrConstEnumOnlyModule(target));
            }