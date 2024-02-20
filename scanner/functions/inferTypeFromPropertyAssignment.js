function inferTypeFromPropertyAssignment(assignment, usage) {
                const nodeWithRealType = isVariableDeclaration(assignment.parent.parent) ? assignment.parent.parent : assignment.parent;
                addCandidateThisType(usage, checker.getTypeAtLocation(nodeWithRealType));
            }