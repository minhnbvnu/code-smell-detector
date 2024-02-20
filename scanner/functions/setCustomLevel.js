function setCustomLevel(level) {
                    const customLevel = getLevel(baseVariable, level);
                    if (customLevel) {
                        (customLevels || (customLevels = {}))[level] = Number(customLevel);
                    }
                }