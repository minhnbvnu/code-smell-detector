function parseKey(key2) {
                const symbolName2 = key2.substring(0, key2.indexOf("|"));
                const moduleKey = key2.substring(key2.lastIndexOf("|") + 1);
                const ambientModuleName = moduleKey === "" ? void 0 : moduleKey;
                return { symbolName: symbolName2, ambientModuleName };
            }