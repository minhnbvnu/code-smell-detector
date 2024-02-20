function spanInNodeIfStartsOnSameLine(node, otherwiseOnNode) {
                if (node && lineOfPosition === sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line) {
                    return spanInNode(node);
                }
                return spanInNode(otherwiseOnNode);
            }