function pickLongestCandidateSignature(node, candidates, args, checkMode) {
                const bestIndex = getLongestCandidateIndex(candidates, apparentArgumentCount === void 0 ? args.length : apparentArgumentCount);
                const candidate = candidates[bestIndex];
                const { typeParameters } = candidate;
                if (!typeParameters) {
                    return candidate;
                }
                const typeArgumentNodes = callLikeExpressionMayHaveTypeArguments(node) ? node.typeArguments : void 0;
                const instantiated = typeArgumentNodes ? createSignatureInstantiation(candidate, getTypeArgumentsFromNodes(typeArgumentNodes, typeParameters, isInJSFile(node))) : inferSignatureInstantiationForOverloadFailure(node, typeParameters, candidate, args, checkMode);
                candidates[bestIndex] = instantiated;
                return instantiated;
            }