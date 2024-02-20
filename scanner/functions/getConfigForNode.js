function getConfigForNode(node) {
                if (node.generator &&
                    context.options.length > 1 &&
                    context.options[1].generators) {
                    return context.options[1].generators;
                }
                return context.options[0] || "always";
            }