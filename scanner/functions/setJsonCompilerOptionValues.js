function setJsonCompilerOptionValues(changeTracker, configFile, options) {
            const tsconfigObjectLiteral = getTsConfigObjectLiteralExpression(configFile);
            if (!tsconfigObjectLiteral)
                return void 0;
            const compilerOptionsProperty = findJsonProperty(tsconfigObjectLiteral, "compilerOptions");
            if (compilerOptionsProperty === void 0) {
                changeTracker.insertNodeAtObjectStart(configFile, tsconfigObjectLiteral, createJsonPropertyAssignment("compilerOptions", factory.createObjectLiteralExpression(options.map(([optionName, optionValue]) => createJsonPropertyAssignment(optionName, optionValue)), 
                /*multiLine*/
                true)));
                return;
            }
            const compilerOptions = compilerOptionsProperty.initializer;
            if (!isObjectLiteralExpression(compilerOptions)) {
                return;
            }
            for (const [optionName, optionValue] of options) {
                const optionProperty = findJsonProperty(compilerOptions, optionName);
                if (optionProperty === void 0) {
                    changeTracker.insertNodeAtObjectStart(configFile, compilerOptions, createJsonPropertyAssignment(optionName, optionValue));
                }
                else {
                    changeTracker.replaceNode(configFile, optionProperty.initializer, optionValue);
                }
            }
        }