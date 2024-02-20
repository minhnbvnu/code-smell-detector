function GM_getValueSync(key, defaultValue) {
            const pid = Math.random().toString(36).substring(1, 9);
            window.postMessage({ id: _uuid, pid: pid, name: "API_GET_VALUE_SYNC", key: key, defaultValue: defaultValue });
            return __listValuesStroge[key] == null ? defaultValue : __listValuesStroge[key];
        }