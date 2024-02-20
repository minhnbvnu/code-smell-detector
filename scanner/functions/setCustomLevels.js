function setCustomLevels(baseVariable, levels) {
                const customLevels = getCustomLevels(baseVariable);
                if (customLevels) {
                    setLevel("Low");
                    setLevel("Medium");
                    setLevel("High");
                    return true;
                }
                return false;
                function setLevel(level) {
                    levels[level] = customLevels[level] || levels[level];
                }
            }