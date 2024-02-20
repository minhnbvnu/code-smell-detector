function tryRenameExternalModule(factory2, moduleName, sourceFile) {
            const rename = sourceFile.renamedDependencies && sourceFile.renamedDependencies.get(moduleName.text);
            return rename ? factory2.createStringLiteral(rename) : void 0;
        }