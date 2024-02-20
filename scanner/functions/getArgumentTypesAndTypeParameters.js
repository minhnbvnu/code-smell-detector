function getArgumentTypesAndTypeParameters(checker, importAdder, instanceTypes, contextNode, scriptTarget, flags, tracker) {
            const argumentTypeNodes = [];
            const argumentTypeParameters = /* @__PURE__ */ new Map();
            for (let i = 0; i < instanceTypes.length; i += 1) {
                const instanceType = instanceTypes[i];
                if (instanceType.isUnionOrIntersection() && instanceType.types.some(typeContainsTypeParameter)) {
                    const synthesizedTypeParameterName = createTypeParameterName(i);
                    argumentTypeNodes.push(factory.createTypeReferenceNode(synthesizedTypeParameterName));
                    argumentTypeParameters.set(synthesizedTypeParameterName, void 0);
                    continue;
                }
                const widenedInstanceType = checker.getBaseTypeOfLiteralType(instanceType);
                const argumentTypeNode = typeToAutoImportableTypeNode(checker, importAdder, widenedInstanceType, contextNode, scriptTarget, flags, tracker);
                if (!argumentTypeNode) {
                    continue;
                }
                argumentTypeNodes.push(argumentTypeNode);
                const argumentTypeParameter = getFirstTypeParameterName(instanceType);
                const instanceTypeConstraint = instanceType.isTypeParameter() && instanceType.constraint && !isAnonymousObjectConstraintType(instanceType.constraint) ? typeToAutoImportableTypeNode(checker, importAdder, instanceType.constraint, contextNode, scriptTarget, flags, tracker) : void 0;
                if (argumentTypeParameter) {
                    argumentTypeParameters.set(argumentTypeParameter, { argumentType: instanceType, constraint: instanceTypeConstraint });
                }
            }
            return { argumentTypeNodes, argumentTypeParameters: arrayFrom(argumentTypeParameters.entries()) };
        }