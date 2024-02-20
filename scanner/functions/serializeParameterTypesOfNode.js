function serializeParameterTypesOfNode(node, container) {
                const valueDeclaration = isClassLike(node) ? getFirstConstructorWithBody(node) : isFunctionLike(node) && nodeIsPresent(node.body) ? node : void 0;
                const expressions = [];
                if (valueDeclaration) {
                    const parameters = getParametersOfDecoratedDeclaration(valueDeclaration, container);
                    const numParameters = parameters.length;
                    for (let i = 0; i < numParameters; i++) {
                        const parameter = parameters[i];
                        if (i === 0 && isIdentifier(parameter.name) && parameter.name.escapedText === "this") {
                            continue;
                        }
                        if (parameter.dotDotDotToken) {
                            expressions.push(serializeTypeNode(getRestParameterElementType(parameter.type)));
                        }
                        else {
                            expressions.push(serializeTypeOfNode(parameter));
                        }
                    }
                }
                return factory.createArrayLiteralExpression(expressions);
            }