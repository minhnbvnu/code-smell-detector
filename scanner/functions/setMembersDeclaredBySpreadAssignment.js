function setMembersDeclaredBySpreadAssignment(declaration, membersDeclaredBySpreadAssignment) {
                const expression = declaration.expression;
                const symbol = typeChecker.getSymbolAtLocation(expression);
                const type = symbol && typeChecker.getTypeOfSymbolAtLocation(symbol, expression);
                const properties = type && type.properties;
                if (properties) {
                    properties.forEach((property) => {
                        membersDeclaredBySpreadAssignment.add(property.name);
                    });
                }
            }