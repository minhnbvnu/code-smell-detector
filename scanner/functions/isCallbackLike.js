function isCallbackLike(checker, sourceFile, name) {
            return !!ts_FindAllReferences_exports.Core.eachSymbolReferenceInFile(name, checker, sourceFile, (reference) => isIdentifier(reference) && isCallExpression(reference.parent) && reference.parent.arguments.indexOf(reference) >= 0);
        }