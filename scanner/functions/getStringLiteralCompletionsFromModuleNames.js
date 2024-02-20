function getStringLiteralCompletionsFromModuleNames(sourceFile, node, compilerOptions, host, typeChecker, preferences) {
            return addReplacementSpans(node.text, node.getStart(sourceFile) + 1, getStringLiteralCompletionsFromModuleNamesWorker(sourceFile, node, compilerOptions, host, typeChecker, preferences));
        }