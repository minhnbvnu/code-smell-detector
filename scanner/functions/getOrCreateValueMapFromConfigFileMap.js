function getOrCreateValueMapFromConfigFileMap(configFileMap, resolved) {
            return getOrCreateValueFromConfigFileMap(configFileMap, resolved, () => /* @__PURE__ */ new Map());
        }