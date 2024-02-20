function getCompilationSettings(settingsOrHost) {
                if (typeof settingsOrHost.getCompilationSettings === "function") {
                    return settingsOrHost.getCompilationSettings();
                }
                return settingsOrHost;
            }