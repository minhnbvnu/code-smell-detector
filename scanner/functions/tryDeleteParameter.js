function tryDeleteParameter(changes, sourceFile, parameter, checker, sourceFiles, program, cancellationToken, isFixAll = false) {
            if (mayDeleteParameter(checker, sourceFile, parameter, sourceFiles, program, cancellationToken, isFixAll)) {
                if (parameter.modifiers && parameter.modifiers.length > 0 && (!isIdentifier(parameter.name) || ts_FindAllReferences_exports.Core.isSymbolReferencedInFile(parameter.name, checker, sourceFile))) {
                    for (const modifier of parameter.modifiers) {
                        if (isModifier(modifier)) {
                            changes.deleteModifier(sourceFile, modifier);
                        }
                    }
                }
                else if (!parameter.initializer && isNotProvidedArguments(parameter, checker, sourceFiles)) {
                    changes.delete(sourceFile, parameter);
                }
            }
        }