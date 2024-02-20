function getModuleResolver(moduleResolverPath) {
        let moduleResolver;
        try {
            moduleResolver = require(moduleResolverPath);
        }
        catch (error) {
            const errorLines = [
                'Could not find the provided parserOptions.moduleResolver.',
                'Hint: use an absolute path if you are not in control over where the ESLint instance runs.',
            ];
            throw new Error(errorLines.join('\n'));
        }
        return moduleResolver;
    }