function getSymbolReferencedByIdentifier(identifier) {
                return identifier.parent && isShorthandPropertyAssignment(identifier.parent) && identifier.parent.name === identifier ? checker.getShorthandAssignmentValueSymbol(identifier.parent) : checker.getSymbolAtLocation(identifier);
            }