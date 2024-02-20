function isDuplicatedCommonJSExport(declarations) {
                return declarations && declarations.length > 1 && declarations.every((d) => isInJSFile(d) && isAccessExpression(d) && (isExportsIdentifier(d.expression) || isModuleExportsAccessExpression(d.expression)));
            }