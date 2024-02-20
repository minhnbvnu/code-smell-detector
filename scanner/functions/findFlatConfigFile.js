function findFlatConfigFile(cwd) {
        return findUp(FLAT_CONFIG_FILENAME, { cwd });
    }