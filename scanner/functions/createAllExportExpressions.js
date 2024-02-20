function createAllExportExpressions(name, value, location) {
                const exportedNames = getExports(name);
                if (exportedNames) {
                    let expression = isExportName(name) ? value : factory2.createAssignment(name, value);
                    for (const exportName of exportedNames) {
                        setEmitFlags(expression, 8 /* NoSubstitution */);
                        expression = createExportExpression(exportName, expression, 
                        /*location*/
                        location);
                    }
                    return expression;
                }
                return factory2.createAssignment(name, value);
            }