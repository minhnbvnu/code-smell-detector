function updateJSDocFunctionType(node, parameters, type) {
                return node.parameters !== parameters || node.type !== type ? update(createJSDocFunctionType(parameters, type), node) : node;
            }