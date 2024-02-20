function isCurrentlyEditingNode(node2) {
                return node2.getStart(sourceFile) <= position && position <= node2.getEnd();
            }