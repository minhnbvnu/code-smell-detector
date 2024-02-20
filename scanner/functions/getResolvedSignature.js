function getResolvedSignature(node, candidatesOutArray, checkMode) {
                const links = getNodeLinks(node);
                const cached = links.resolvedSignature;
                if (cached && cached !== resolvingSignature && !candidatesOutArray) {
                    return cached;
                }
                links.resolvedSignature = resolvingSignature;
                const result = resolveSignature(node, candidatesOutArray, checkMode || 0 /* Normal */);
                if (result !== resolvingSignature) {
                    links.resolvedSignature = flowLoopStart === flowLoopCount ? result : cached;
                }
                return result;
            }