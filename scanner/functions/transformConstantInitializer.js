function transformConstantInitializer(initializer, substitutions) {
            return substitutions.size ? visitor(initializer) : initializer;
            function visitor(node) {
                const substitution = substitutions.get(getNodeId(node).toString());
                return substitution ? getSynthesizedDeepClone(substitution) : visitEachChild(node, visitor, nullTransformationContext);
            }
        }