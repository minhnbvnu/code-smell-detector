function transformFunctionInitializerAndType(variableType2, initializer2) {
                if (variableType2 === void 0)
                    return { variableType: variableType2, initializer: initializer2 };
                if (!isFunctionExpression(initializer2) && !isArrowFunction(initializer2) || !!initializer2.typeParameters)
                    return { variableType: variableType2, initializer: initializer2 };
                const functionType = checker.getTypeAtLocation(node);
                const functionSignature = singleOrUndefined(checker.getSignaturesOfType(functionType, 0 /* Call */));
                if (!functionSignature)
                    return { variableType: variableType2, initializer: initializer2 };
                if (!!functionSignature.getTypeParameters())
                    return { variableType: variableType2, initializer: initializer2 };
                const parameters = [];
                let hasAny = false;
                for (const p of initializer2.parameters) {
                    if (p.type) {
                        parameters.push(p);
                    }
                    else {
                        const paramType = checker.getTypeAtLocation(p);
                        if (paramType === checker.getAnyType())
                            hasAny = true;
                        parameters.push(factory.updateParameterDeclaration(p, p.modifiers, p.dotDotDotToken, p.name, p.questionToken, p.type || checker.typeToTypeNode(paramType, scope, 1 /* NoTruncation */), p.initializer));
                    }
                }
                if (hasAny)
                    return { variableType: variableType2, initializer: initializer2 };
                variableType2 = void 0;
                if (isArrowFunction(initializer2)) {
                    initializer2 = factory.updateArrowFunction(initializer2, canHaveModifiers(node) ? getModifiers(node) : void 0, initializer2.typeParameters, parameters, initializer2.type || checker.typeToTypeNode(functionSignature.getReturnType(), scope, 1 /* NoTruncation */), initializer2.equalsGreaterThanToken, initializer2.body);
                }
                else {
                    if (functionSignature && !!functionSignature.thisParameter) {
                        const firstParameter = firstOrUndefined(parameters);
                        if (!firstParameter || isIdentifier(firstParameter.name) && firstParameter.name.escapedText !== "this") {
                            const thisType = checker.getTypeOfSymbolAtLocation(functionSignature.thisParameter, node);
                            parameters.splice(0, 0, factory.createParameterDeclaration(
                            /* modifiers */
                            void 0, 
                            /* dotDotDotToken */
                            void 0, "this", 
                            /* questionToken */
                            void 0, checker.typeToTypeNode(thisType, scope, 1 /* NoTruncation */)));
                        }
                    }
                    initializer2 = factory.updateFunctionExpression(initializer2, canHaveModifiers(node) ? getModifiers(node) : void 0, initializer2.asteriskToken, initializer2.name, initializer2.typeParameters, parameters, initializer2.type || checker.typeToTypeNode(functionSignature.getReturnType(), scope, 1 /* NoTruncation */), initializer2.body);
                }
                return { variableType: variableType2, initializer: initializer2 };
            }