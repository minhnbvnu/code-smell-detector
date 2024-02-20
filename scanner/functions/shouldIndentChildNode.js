function shouldIndentChildNode(settings, parent2, child, sourceFile, isNextChild = false) {
                        return nodeWillIndentChild(settings, parent2, child, sourceFile, 
                        /*indentByDefault*/
                        false) && !(isNextChild && child && isControlFlowEndingStatement(child.kind, parent2));
                    }