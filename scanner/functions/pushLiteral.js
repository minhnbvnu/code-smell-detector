function pushLiteral(node, containers) {
            return isPropertyNameLiteral(node) && (containers.push(getTextOfIdentifierOrLiteral(node)), true);
        }