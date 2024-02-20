function getLevel(envVar, level) {
                return system.getEnvironmentVariable(`${envVar}_${level.toUpperCase()}`);
            }