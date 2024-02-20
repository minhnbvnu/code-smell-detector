function isReadonlyAssignmentDeclaration(node, checker) {
        if (!isBindableObjectDefinePropertyCall(node))
            return false;
        const descriptorType = checker.getTypeAtLocation(node.arguments[2]);
        if (descriptorType.getProperty('value') === undefined)
            return descriptorType.getProperty('set') === undefined;
        const writableProp = descriptorType.getProperty('writable');
        if (writableProp === undefined)
            return false;
        const writableType = writableProp.valueDeclaration !== undefined && node_1.isPropertyAssignment(writableProp.valueDeclaration)
            ? checker.getTypeAtLocation(writableProp.valueDeclaration.initializer)
            : checker.getTypeOfSymbolAtLocation(writableProp, node.arguments[2]);
        return type_1.isBooleanLiteralType(writableType, false);
    }