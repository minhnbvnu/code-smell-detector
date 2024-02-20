function readJsonOrUndefined(path, hostOrText) {
            const jsonText = isString(hostOrText) ? hostOrText : hostOrText.readFile(path);
            if (!jsonText)
                return void 0;
            const result = parseConfigFileTextToJson(path, jsonText);
            return !result.error ? result.config : void 0;
        }