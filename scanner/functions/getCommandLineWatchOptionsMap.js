function getCommandLineWatchOptionsMap() {
            return commandLineWatchOptionsMapCache || (commandLineWatchOptionsMapCache = commandLineOptionsToMap(optionsForWatch));
        }