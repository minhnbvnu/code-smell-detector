function getCommandLineCompilerOptionsMap() {
            return commandLineCompilerOptionsMapCache || (commandLineCompilerOptionsMapCache = commandLineOptionsToMap(optionDeclarations));
        }