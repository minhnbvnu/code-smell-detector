function runWithInferenceBlockedFromSourceNode(node, fn) {
                const containingCall = findAncestor(node, isCallLikeExpression);
                if (containingCall) {
                    let toMarkSkip = node;
                    do {
                        getNodeLinks(toMarkSkip).skipDirectInference = true;
                        toMarkSkip = toMarkSkip.parent;
                    } while (toMarkSkip && toMarkSkip !== containingCall);
                }
                isInferencePartiallyBlocked = true;
                const result = runWithoutResolvedSignatureCaching(node, fn);
                isInferencePartiallyBlocked = false;
                if (containingCall) {
                    let toMarkSkip = node;
                    do {
                        getNodeLinks(toMarkSkip).skipDirectInference = void 0;
                        toMarkSkip = toMarkSkip.parent;
                    } while (toMarkSkip && toMarkSkip !== containingCall);
                }
                return result;
            }