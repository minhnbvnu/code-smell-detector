function getModuleSpecifierResolverHost(program, host) {
            return {
                ...createModuleSpecifierResolutionHost(program, host),
                getCommonSourceDirectory: () => program.getCommonSourceDirectory()
            };
        }