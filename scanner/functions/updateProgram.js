function updateProgram() {
                switch (reloadLevel) {
                    case 1 /* Partial */:
                        perfLogger.logStartUpdateProgram("PartialConfigReload");
                        reloadFileNamesFromConfigFile();
                        break;
                    case 2 /* Full */:
                        perfLogger.logStartUpdateProgram("FullConfigReload");
                        reloadConfigFile();
                        break;
                    default:
                        perfLogger.logStartUpdateProgram("SynchronizeProgram");
                        synchronizeProgram();
                        break;
                }
                perfLogger.logStopUpdateProgram("Done");
                return getCurrentBuilderProgram();
            }