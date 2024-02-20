function requirePaddingFor(node) {
                switch (node.type) {
                    case "BlockStatement":
                    case "StaticBlock":
                        return options.blocks;
                    case "SwitchStatement":
                        return options.switches;
                    case "ClassBody":
                        return options.classes;
                    /* c8 ignore next */
                    default:
                        throw new Error("unreachable");
                }
            }