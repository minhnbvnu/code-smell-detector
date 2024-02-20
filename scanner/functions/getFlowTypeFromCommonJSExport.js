function getFlowTypeFromCommonJSExport(symbol) {
                const file = getSourceFileOfNode(symbol.declarations[0]);
                const accessName = unescapeLeadingUnderscores(symbol.escapedName);
                const areAllModuleExports = symbol.declarations.every((d) => isInJSFile(d) && isAccessExpression(d) && isModuleExportsAccessExpression(d.expression));
                const reference = areAllModuleExports ? factory.createPropertyAccessExpression(factory.createPropertyAccessExpression(factory.createIdentifier("module"), factory.createIdentifier("exports")), accessName) : factory.createPropertyAccessExpression(factory.createIdentifier("exports"), accessName);
                if (areAllModuleExports) {
                    setParent(reference.expression.expression, reference.expression);
                }
                setParent(reference.expression, reference);
                setParent(reference, file);
                reference.flowNode = file.endFlowNode;
                return getFlowTypeOfReference(reference, autoType, undefinedType);
            }