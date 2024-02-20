function checkForTypeConditional(node) {
                checkAndReportAssignmentSpace(node.extendsType, node.trueType);
                checkAndReportAssignmentSpace(node.trueType, node.falseType);
            }