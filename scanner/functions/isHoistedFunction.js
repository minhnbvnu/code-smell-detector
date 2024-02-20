function isHoistedFunction(node) {
            return isCustomPrologue(node) && isFunctionDeclaration(node);
        }