function inferTypeFromSwitchStatementLabel(parent2, usage) {
                addCandidateType(usage, checker.getTypeAtLocation(parent2.parent.parent.expression));
            }