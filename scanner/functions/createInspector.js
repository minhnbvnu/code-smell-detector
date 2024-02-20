function createInspector(nodeDesc) {
            return (function inspect(emitted) {
                let node = emitted.node;

                if (emitted.exit) {
                    return;
                }

                if (!camelCaseRegEx.test(node.name)) {
                    context.report({
                        node: node,
                        message: nodeDesc + " name '" + node.name + "' doesn't follow the CamelCase notation."
                    });
                }
            });
        }