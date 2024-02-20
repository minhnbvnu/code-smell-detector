function getCustomLevels(baseVariable) {
                let customLevels;
                setCustomLevel("Low");
                setCustomLevel("Medium");
                setCustomLevel("High");
                return customLevels;
                function setCustomLevel(level) {
                    const customLevel = getLevel(baseVariable, level);
                    if (customLevel) {
                        (customLevels || (customLevels = {}))[level] = Number(customLevel);
                    }
                }
            }