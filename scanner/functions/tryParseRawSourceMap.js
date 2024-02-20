function tryParseRawSourceMap(text) {
            try {
                const parsed = JSON.parse(text);
                if (isRawSourceMap(parsed)) {
                    return parsed;
                }
            }
            catch (e) {
            }
            return void 0;
        }