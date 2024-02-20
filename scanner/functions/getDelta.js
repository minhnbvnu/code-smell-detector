function getDelta(child) {
                    return SmartIndenter.nodeWillIndentChild(options, node, child, sourceFile, 
                    /*indentByDefault*/
                    true) ? delta2 : 0;
                }