function getKeyForCompilerOptions(options, affectingOptionDeclarations) {
            return affectingOptionDeclarations.map((option) => compilerOptionValueToString(getCompilerOptionValue(options, option))).join("|") + (options.pathsBasePath ? `|${options.pathsBasePath}` : void 0);
        }