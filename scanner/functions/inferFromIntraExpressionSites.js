function inferFromIntraExpressionSites(context) {
                if (context.intraExpressionInferenceSites) {
                    for (const { node, type } of context.intraExpressionInferenceSites) {
                        const contextualType = node.kind === 171 /* MethodDeclaration */ ? getContextualTypeForObjectLiteralMethod(node, 2 /* NoConstraints */) : getContextualType2(node, 2 /* NoConstraints */);
                        if (contextualType) {
                            inferTypes(context.inferences, type, contextualType);
                        }
                    }
                    context.intraExpressionInferenceSites = void 0;
                }
            }