function shouldEmitUnderscoreUnderscoreESModule() {
                if (!currentModuleInfo.exportEquals && isExternalModule(currentSourceFile)) {
                    return true;
                }
                return false;
            }