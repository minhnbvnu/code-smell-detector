function getModuleInstanceStateCached(node, visited = /* @__PURE__ */ new Map()) {
            const nodeId = getNodeId(node);
            if (visited.has(nodeId)) {
                return visited.get(nodeId) || 0 /* NonInstantiated */;
            }
            visited.set(nodeId, void 0);
            const result = getModuleInstanceStateWorker(node, visited);
            visited.set(nodeId, result);
            return result;
        }