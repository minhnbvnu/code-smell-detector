function getKeyLocEnd(node) {
                return getLastTokenBeforeColon(node.type !== utils_1.AST_NODE_TYPES.TSIndexSignature
                    ? node.key
                    : at(node.parameters, -1)).loc.end;
            }