function runWithoutResolvedSignatureCaching(node, fn) {
                const containingCall = findAncestor(node, isCallLikeExpression);
                const containingCallResolvedSignature = containingCall && getNodeLinks(containingCall).resolvedSignature;
                if (containingCall) {
                    getNodeLinks(containingCall).resolvedSignature = void 0;
                }
                const result = fn();
                if (containingCall) {
                    getNodeLinks(containingCall).resolvedSignature = containingCallResolvedSignature;
                }
                return result;
            }