function loadTypesMap(host, typesMapPath) {
            var _a2;
            const result = readConfigFile(typesMapPath, (path) => host.readFile(path));
            if ((_a2 = result.config) == null ? void 0 : _a2.simpleMap) {
                return new Map(Object.entries(result.config.simpleMap));
            }
            return void 0;
        }