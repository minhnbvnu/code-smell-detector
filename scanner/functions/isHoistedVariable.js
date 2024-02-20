function isHoistedVariable(node) {
            return isIdentifier(node.name) && !node.initializer;
        }