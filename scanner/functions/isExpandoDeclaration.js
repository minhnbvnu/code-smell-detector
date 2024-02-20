function isExpandoDeclaration(node) {
            if (!isAssignmentDeclaration(node))
                return false;
            const containingAssignment = findAncestor(node, (p) => {
                if (isAssignmentExpression(p))
                    return true;
                if (!isAssignmentDeclaration(p))
                    return "quit";
                return false;
            });
            return !!containingAssignment && getAssignmentDeclarationKind(containingAssignment) === 5 /* Property */;
        }