function getStringLiteralCompletionsFromSignature(call, arg, argumentInfo, checker) {
            let isNewIdentifier = false;
            const uniques = /* @__PURE__ */ new Map();
            const candidates = [];
            const editingArgument = isJsxOpeningLikeElement(call) ? Debug.checkDefined(findAncestor(arg.parent, isJsxAttribute)) : arg;
            checker.getResolvedSignatureForStringLiteralCompletions(call, editingArgument, candidates);
            const types = flatMap(candidates, (candidate) => {
                if (!signatureHasRestParameter(candidate) && argumentInfo.argumentCount > candidate.parameters.length)
                    return;
                let type = candidate.getTypeParameterAtPosition(argumentInfo.argumentIndex);
                if (isJsxOpeningLikeElement(call)) {
                    const propType = checker.getTypeOfPropertyOfType(type, editingArgument.name.text);
                    if (propType) {
                        type = propType;
                    }
                }
                isNewIdentifier = isNewIdentifier || !!(type.flags & 4 /* String */);
                return getStringLiteralTypes(type, uniques);
            });
            return length(types) ? { kind: 2 /* Types */, types, isNewIdentifier } : void 0;
        }