function addNewFileToTsconfig(program, changes, oldFileName, newFileNameWithExtension, getCanonicalFileName) {
            const cfg = program.getCompilerOptions().configFile;
            if (!cfg)
                return;
            const newFileAbsolutePath = normalizePath(combinePaths(oldFileName, "..", newFileNameWithExtension));
            const newFilePath = getRelativePathFromFile(cfg.fileName, newFileAbsolutePath, getCanonicalFileName);
            const cfgObject = cfg.statements[0] && tryCast(cfg.statements[0].expression, isObjectLiteralExpression);
            const filesProp = cfgObject && find(cfgObject.properties, (prop) => isPropertyAssignment(prop) && isStringLiteral(prop.name) && prop.name.text === "files");
            if (filesProp && isArrayLiteralExpression(filesProp.initializer)) {
                changes.insertNodeInListAfter(cfg, last(filesProp.initializer.elements), factory.createStringLiteral(newFilePath), filesProp.initializer.elements);
            }
        }