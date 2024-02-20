function showModuleSpecifier({ moduleSpecifier }) {
            return isStringLiteral(moduleSpecifier) ? moduleSpecifier.text : getTextOfNode(moduleSpecifier);
        }