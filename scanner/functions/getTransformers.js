function getTransformers(compilerOptions, customTransformers, emitOnly) {
            return {
                scriptTransformers: getScriptTransformers(compilerOptions, customTransformers, emitOnly),
                declarationTransformers: getDeclarationTransformers(customTransformers)
            };
        }