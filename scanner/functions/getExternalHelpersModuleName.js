function getExternalHelpersModuleName(node) {
            const parseNode = getOriginalNode(node, isSourceFile);
            const emitNode = parseNode && parseNode.emitNode;
            return emitNode && emitNode.externalHelpersModuleName;
        }