function parameterInitializerContainsUndefined(declaration) {
                const links = getNodeLinks(declaration);
                if (links.parameterInitializerContainsUndefined === void 0) {
                    if (!pushTypeResolution(declaration, 9 /* ParameterInitializerContainsUndefined */)) {
                        reportCircularityError(declaration.symbol);
                        return true;
                    }
                    const containsUndefined = !!(getTypeFacts(checkDeclarationInitializer(declaration, 0 /* Normal */)) & 16777216 /* IsUndefined */);
                    if (!popTypeResolution()) {
                        reportCircularityError(declaration.symbol);
                        return true;
                    }
                    links.parameterInitializerContainsUndefined = containsUndefined;
                }
                return links.parameterInitializerContainsUndefined;
            }