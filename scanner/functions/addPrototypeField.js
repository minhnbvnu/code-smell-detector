function addPrototypeField(classType, ast, context) {
        var field = new TypeScript.ValueLocation();
        field.typeLink = new TypeScript.TypeLink();
        field.typeLink.ast = ast;
        field.typeLink.type = classType.instanceType;
        var fieldSymbol = new TypeScript.FieldSymbol("prototype", ast.minChar, context.checker.locationInfo.unitIndex, true, field);
        fieldSymbol.flags |= (TypeScript.SymbolFlags.Property | TypeScript.SymbolFlags.BuiltIn);
        field.symbol = fieldSymbol;
        fieldSymbol.declAST = ast;
        classType.members.addPublicMember("prototype", fieldSymbol);
    }