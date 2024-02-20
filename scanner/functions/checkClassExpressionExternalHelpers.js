function checkClassExpressionExternalHelpers(node) {
                var _a2;
                if (node.name)
                    return;
                const parent2 = walkUpOuterExpressions(node);
                if (!isNamedEvaluationSource(parent2))
                    return;
                const willTransformESDecorators = !legacyDecorators && languageVersion < 99 /* ESNext */;
                let location;
                if (willTransformESDecorators && classOrConstructorParameterIsDecorated(
                /*useLegacyDecorators*/
                false, node)) {
                    location = (_a2 = firstOrUndefined(getDecorators(node))) != null ? _a2 : node;
                }
                else {
                    location = getFirstTransformableStaticClassElement(node);
                }
                if (location) {
                    checkExternalEmitHelpers(location, 8388608 /* SetFunctionName */);
                    if ((isPropertyAssignment(parent2) || isPropertyDeclaration(parent2) || isBindingElement(parent2)) && isComputedPropertyName(parent2.name)) {
                        checkExternalEmitHelpers(location, 16777216 /* PropKey */);
                    }
                }
            }