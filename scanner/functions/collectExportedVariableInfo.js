function collectExportedVariableInfo(decl, uniqueExports, exportedNames) {
            if (isBindingPattern(decl.name)) {
                for (const element of decl.name.elements) {
                    if (!isOmittedExpression(element)) {
                        exportedNames = collectExportedVariableInfo(element, uniqueExports, exportedNames);
                    }
                }
            }
            else if (!isGeneratedIdentifier(decl.name)) {
                const text = idText(decl.name);
                if (!uniqueExports.get(text)) {
                    uniqueExports.set(text, true);
                    exportedNames = append(exportedNames, decl.name);
                }
            }
            return exportedNames;
        }