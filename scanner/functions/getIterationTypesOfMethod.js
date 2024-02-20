function getIterationTypesOfMethod(type, resolver, methodName, errorNode, errorOutputContainer) {
                var _a2, _b, _c, _d, _e, _f;
                const method = getPropertyOfType(type, methodName);
                if (!method && methodName !== "next") {
                    return void 0;
                }
                const methodType = method && !(methodName === "next" && method.flags & 16777216 /* Optional */) ? methodName === "next" ? getTypeOfSymbol(method) : getTypeWithFacts(getTypeOfSymbol(method), 2097152 /* NEUndefinedOrNull */) : void 0;
                if (isTypeAny(methodType)) {
                    return methodName === "next" ? anyIterationTypes : anyIterationTypesExceptNext;
                }
                const methodSignatures = methodType ? getSignaturesOfType(methodType, 0 /* Call */) : emptyArray;
                if (methodSignatures.length === 0) {
                    if (errorNode) {
                        const diagnostic = methodName === "next" ? resolver.mustHaveANextMethodDiagnostic : resolver.mustBeAMethodDiagnostic;
                        if (errorOutputContainer) {
                            (_a2 = errorOutputContainer.errors) != null ? _a2 : errorOutputContainer.errors = [];
                            errorOutputContainer.errors.push(createDiagnosticForNode(errorNode, diagnostic, methodName));
                        }
                        else {
                            error(errorNode, diagnostic, methodName);
                        }
                    }
                    return methodName === "next" ? noIterationTypes : void 0;
                }
                if ((methodType == null ? void 0 : methodType.symbol) && methodSignatures.length === 1) {
                    const globalGeneratorType = resolver.getGlobalGeneratorType(
                    /*reportErrors*/
                    false);
                    const globalIteratorType = resolver.getGlobalIteratorType(
                    /*reportErrors*/
                    false);
                    const isGeneratorMethod = ((_c = (_b = globalGeneratorType.symbol) == null ? void 0 : _b.members) == null ? void 0 : _c.get(methodName)) === methodType.symbol;
                    const isIteratorMethod = !isGeneratorMethod && ((_e = (_d = globalIteratorType.symbol) == null ? void 0 : _d.members) == null ? void 0 : _e.get(methodName)) === methodType.symbol;
                    if (isGeneratorMethod || isIteratorMethod) {
                        const globalType = isGeneratorMethod ? globalGeneratorType : globalIteratorType;
                        const { mapper } = methodType;
                        return createIterationTypes(getMappedType(globalType.typeParameters[0], mapper), getMappedType(globalType.typeParameters[1], mapper), methodName === "next" ? getMappedType(globalType.typeParameters[2], mapper) : void 0);
                    }
                }
                let methodParameterTypes;
                let methodReturnTypes;
                for (const signature of methodSignatures) {
                    if (methodName !== "throw" && some(signature.parameters)) {
                        methodParameterTypes = append(methodParameterTypes, getTypeAtPosition(signature, 0));
                    }
                    methodReturnTypes = append(methodReturnTypes, getReturnTypeOfSignature(signature));
                }
                let returnTypes;
                let nextType;
                if (methodName !== "throw") {
                    const methodParameterType = methodParameterTypes ? getUnionType(methodParameterTypes) : unknownType;
                    if (methodName === "next") {
                        nextType = methodParameterType;
                    }
                    else if (methodName === "return") {
                        const resolvedMethodParameterType = resolver.resolveIterationType(methodParameterType, errorNode) || anyType;
                        returnTypes = append(returnTypes, resolvedMethodParameterType);
                    }
                }
                let yieldType;
                const methodReturnType = methodReturnTypes ? getIntersectionType(methodReturnTypes) : neverType;
                const resolvedMethodReturnType = resolver.resolveIterationType(methodReturnType, errorNode) || anyType;
                const iterationTypes = getIterationTypesOfIteratorResult(resolvedMethodReturnType);
                if (iterationTypes === noIterationTypes) {
                    if (errorNode) {
                        if (errorOutputContainer) {
                            (_f = errorOutputContainer.errors) != null ? _f : errorOutputContainer.errors = [];
                            errorOutputContainer.errors.push(createDiagnosticForNode(errorNode, resolver.mustHaveAValueDiagnostic, methodName));
                        }
                        else {
                            error(errorNode, resolver.mustHaveAValueDiagnostic, methodName);
                        }
                    }
                    yieldType = anyType;
                    returnTypes = append(returnTypes, anyType);
                }
                else {
                    yieldType = iterationTypes.yieldType;
                    returnTypes = append(returnTypes, iterationTypes.returnType);
                }
                return createIterationTypes(yieldType, getUnionType(returnTypes), nextType);
            }