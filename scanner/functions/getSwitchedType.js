function getSwitchedType(caseClause, checker) {
            return checker.getTypeAtLocation(caseClause.parent.parent.expression);
        }