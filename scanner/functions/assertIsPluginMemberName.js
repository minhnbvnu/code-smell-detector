function assertIsPluginMemberName(value) {
        if (!/[@a-z0-9-_$]+(?:\/(?:[a-z0-9-_$]+))+$/iu.test(value)) {
            throw new TypeError(`Expected string in the form "pluginName/objectName" but found "${value}".`);
        }
    }