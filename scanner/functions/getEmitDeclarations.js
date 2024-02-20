function getEmitDeclarations(compilerOptions) {
            return !!(compilerOptions.declaration || compilerOptions.composite);
        }