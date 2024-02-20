function loadLevel(level, currentLevel) {
        if (level <= maxLevelWithoutError) {
            if (level == currentLevel && !LOADED) {
                LOADED = true;
            }
            nodeLayer.level = level;
            history.push({ level });
        } else {
            state.noData({ targetLevel: level });
            history.push({ error: level });
        }
    }