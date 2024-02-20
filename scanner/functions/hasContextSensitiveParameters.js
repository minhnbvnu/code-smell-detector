function hasContextSensitiveParameters(node) {
            if (!node.typeParameters) {
                if (some(node.parameters, (p) => !getEffectiveTypeAnnotationNode(p))) {
                    return true;
                }
                if (node.kind !== 216 /* ArrowFunction */) {
                    const parameter = firstOrUndefined(node.parameters);
                    if (!(parameter && parameterIsThisKeyword(parameter))) {
                        return true;
                    }
                }
            }
            return false;
        }