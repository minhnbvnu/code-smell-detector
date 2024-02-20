function getPluginModuleName(id) {

        const tmp = data[id]();
        return tmp.default ?? data[id]();
    }