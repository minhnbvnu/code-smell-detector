function tryParseJson(text) {
            try {
                return JSON.parse(text);
            }
            catch (e) {
                return void 0;
            }
        }