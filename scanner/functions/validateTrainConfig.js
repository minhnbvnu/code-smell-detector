function validateTrainConfig(config) {
        if (![config.noObjectScale, config.objectScale, config.coordScale, config.classScale].every(isNumber$1)) {
            throw new Error("for training you have to specify noObjectScale, objectScale, coordScale, classScale parameters in your config.json file");
        }
        return config;
    }