function getNoopSymbolTrackerWithResolver(context) {
            return {
                trackSymbol: () => false,
                moduleResolverHost: getModuleSpecifierResolverHost(context.program, context.host)
            };
        }