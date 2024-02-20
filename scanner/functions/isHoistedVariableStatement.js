function isHoistedVariableStatement(node) {
            return isCustomPrologue(node) && isVariableStatement(node) && every(node.declarationList.declarations, isHoistedVariable);
        }