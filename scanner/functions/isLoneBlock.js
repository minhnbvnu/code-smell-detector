function isLoneBlock(node) {
                return node.parent.type === "BlockStatement" ||
                    node.parent.type === "StaticBlock" ||
                    node.parent.type === "Program" ||
                    // Don't report blocks in switch cases if the block is the only statement of the case.
                    node.parent.type === "SwitchCase" && !(node.parent.consequent[0] === node && node.parent.consequent.length === 1);
            }