function GM_setValueSync(key, value) {
            __listValuesStroge[key] = value;
            window.postMessage({ id: _uuid, name: "API_SET_VALUE_SYNC", key: key, value: value });
        }