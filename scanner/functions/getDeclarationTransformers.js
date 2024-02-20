function getDeclarationTransformers(customTransformers) {
            const transformers = [];
            transformers.push(transformDeclarations);
            addRange(transformers, customTransformers && map(customTransformers.afterDeclarations, wrapDeclarationTransformerFactory));
            return transformers;
        }