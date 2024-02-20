function canCompleteFromNamedBindings(namedBindings) {
            if (!isModuleSpecifierMissingOrEmpty(namedBindings.parent.parent.moduleSpecifier) || namedBindings.parent.name) {
                return false;
            }
            if (isNamedImports(namedBindings)) {
                const invalidNamedImport = getPotentiallyInvalidImportSpecifier(namedBindings);
                const validImports = invalidNamedImport ? namedBindings.elements.indexOf(invalidNamedImport) : namedBindings.elements.length;
                return validImports < 2;
            }
            return true;
        }