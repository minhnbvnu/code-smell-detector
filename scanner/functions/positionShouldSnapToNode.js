function positionShouldSnapToNode(sourceFile, pos, node) {
            Debug.assert(node.pos <= pos);
            if (pos < node.end) {
                return true;
            }
            const nodeEnd = node.getEnd();
            if (nodeEnd === pos) {
                return getTouchingPropertyName(sourceFile, pos).pos < node.end;
            }
            return false;
        }