function checkForIf(node) {
                return node.type === "IfStatement" && hasElse(node) &&
                    naiveHasReturn(node.alternate) && naiveHasReturn(node.consequent);
            }