function getAssignmentDeclarationKind(expr) {
            const special = getAssignmentDeclarationKindWorker(expr);
            return special === 5 /* Property */ || isInJSFile(expr) ? special : 0 /* None */;
        }