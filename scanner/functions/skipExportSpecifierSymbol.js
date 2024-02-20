function skipExportSpecifierSymbol(symbol, checker) {
            if (symbol.declarations) {
                for (const declaration of symbol.declarations) {
                    if (isExportSpecifier(declaration) && !declaration.propertyName && !declaration.parent.parent.moduleSpecifier) {
                        return checker.getExportSpecifierLocalTargetSymbol(declaration) || symbol;
                    }
                    else if (isPropertyAccessExpression(declaration) && isModuleExportsAccessExpression(declaration.expression) && !isPrivateIdentifier(declaration.name)) {
                        return checker.getSymbolAtLocation(declaration);
                    }
                    else if (isShorthandPropertyAssignment(declaration) && isBinaryExpression(declaration.parent.parent) && getAssignmentDeclarationKind(declaration.parent.parent) === 2 /* ModuleExports */) {
                        return checker.getExportSpecifierLocalTargetSymbol(declaration.name);
                    }
                }
            }
            return symbol;
        }