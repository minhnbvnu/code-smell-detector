function canEmitSimpleArrowHead(parentNode, parameters) {
                const parameter = singleOrUndefined(parameters);
                return parameter && parameter.pos === parentNode.pos && isArrowFunction(parentNode) && !parentNode.type && !some(parentNode.modifiers) && !some(parentNode.typeParameters) && !some(parameter.modifiers) && !parameter.dotDotDotToken && !parameter.questionToken && !parameter.type && !parameter.initializer && isIdentifier(parameter.name);
            }