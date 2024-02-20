function visitFunctionLikeForParameterType(node) {
                const signature = checker.getSignatureFromDeclaration(node);
                if (!signature) {
                    return;
                }
                for (let i = 0; i < node.parameters.length && i < signature.parameters.length; ++i) {
                    const param = node.parameters[i];
                    if (!isHintableDeclaration(param)) {
                        continue;
                    }
                    const effectiveTypeAnnotation = getEffectiveTypeAnnotationNode(param);
                    if (effectiveTypeAnnotation) {
                        continue;
                    }
                    const typeDisplayString = getParameterDeclarationTypeDisplayString(signature.parameters[i]);
                    if (!typeDisplayString) {
                        continue;
                    }
                    addTypeHints(typeDisplayString, param.questionToken ? param.questionToken.end : param.name.end);
                }
            }