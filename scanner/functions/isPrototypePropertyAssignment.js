function isPrototypePropertyAssignment(node) {
            return isBinaryExpression(node) && getAssignmentDeclarationKind(node) === 3 /* PrototypeProperty */;
        }