function getSourceFromOrigin(origin) {
            if (originIsExport(origin)) {
                return stripQuotes(origin.moduleSymbol.name);
            }
            if (originIsResolvedExport(origin)) {
                return origin.moduleSpecifier;
            }
            if ((origin == null ? void 0 : origin.kind) === 1 /* ThisType */) {
                return "ThisProperty/" /* ThisProperty */;
            }
            if ((origin == null ? void 0 : origin.kind) === 64 /* TypeOnlyAlias */) {
                return "TypeOnlyAlias/" /* TypeOnlyAlias */;
            }
        }