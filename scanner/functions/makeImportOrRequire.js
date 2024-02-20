function makeImportOrRequire(sourceFile, defaultImport, imports, newFileNameWithExtension, program, host, useEs6Imports, quotePreference) {
            const pathToNewFile = resolvePath(getDirectoryPath(sourceFile.path), newFileNameWithExtension);
            const pathToNewFileWithCorrectExtension = getModuleSpecifier(program.getCompilerOptions(), sourceFile, sourceFile.path, pathToNewFile, createModuleSpecifierResolutionHost(program, host));
            if (useEs6Imports) {
                const specifiers = imports.map((i) => factory.createImportSpecifier(
                /*isTypeOnly*/
                false, 
                /*propertyName*/
                void 0, factory.createIdentifier(i)));
                return makeImportIfNecessary(defaultImport, specifiers, pathToNewFileWithCorrectExtension, quotePreference);
            }
            else {
                Debug.assert(!defaultImport, "No default import should exist");
                const bindingElements = imports.map((i) => factory.createBindingElement(
                /*dotDotDotToken*/
                void 0, 
                /*propertyName*/
                void 0, i));
                return bindingElements.length ? makeVariableStatement(factory.createObjectBindingPattern(bindingElements), 
                /*type*/
                void 0, createRequireCall(factory.createStringLiteral(pathToNewFileWithCorrectExtension))) : void 0;
            }
        }