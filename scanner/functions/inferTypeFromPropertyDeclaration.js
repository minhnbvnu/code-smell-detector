function inferTypeFromPropertyDeclaration(declaration, usage) {
                addCandidateThisType(usage, checker.getTypeAtLocation(declaration.parent));
            }