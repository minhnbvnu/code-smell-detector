function configInvalidError(configName, importerName, messageTemplate) {
        return Object.assign(new Error(`Failed to load config "${configName}" to extend from.`), {
            messageTemplate,
            messageData: { configName, importerName }
        });
    }