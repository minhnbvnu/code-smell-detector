function areTypeParametersIdentical(declarations, targetParameters, getTypeParameterDeclarations) {
                const maxTypeArgumentCount = length(targetParameters);
                const minTypeArgumentCount = getMinTypeArgumentCount(targetParameters);
                for (const declaration of declarations) {
                    const sourceParameters = getTypeParameterDeclarations(declaration);
                    const numTypeParameters = sourceParameters.length;
                    if (numTypeParameters < minTypeArgumentCount || numTypeParameters > maxTypeArgumentCount) {
                        return false;
                    }
                    for (let i = 0; i < numTypeParameters; i++) {
                        const source = sourceParameters[i];
                        const target = targetParameters[i];
                        if (source.name.escapedText !== target.symbol.escapedName) {
                            return false;
                        }
                        const constraint = getEffectiveConstraintOfTypeParameter(source);
                        const sourceConstraint = constraint && getTypeFromTypeNode(constraint);
                        const targetConstraint = getConstraintOfTypeParameter(target);
                        if (sourceConstraint && targetConstraint && !isTypeIdenticalTo(sourceConstraint, targetConstraint)) {
                            return false;
                        }
                        const sourceDefault = source.default && getTypeFromTypeNode(source.default);
                        const targetDefault = getDefaultFromTypeParameter(target);
                        if (sourceDefault && targetDefault && !isTypeIdenticalTo(sourceDefault, targetDefault)) {
                            return false;
                        }
                    }
                }
                return true;
            }