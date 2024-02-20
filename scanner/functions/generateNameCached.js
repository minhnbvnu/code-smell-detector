function generateNameCached(node, privateName, flags, prefix, suffix) {
                const nodeId = getNodeId(node);
                const cache = privateName ? nodeIdToGeneratedPrivateName : nodeIdToGeneratedName;
                return cache[nodeId] || (cache[nodeId] = generateNameForNode(node, privateName, flags != null ? flags : 0 /* None */, formatGeneratedNamePart(prefix, generateName), formatGeneratedNamePart(suffix)));
            }