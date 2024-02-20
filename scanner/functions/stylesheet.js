function stylesheet() {
            var rulesList = rules();
            return {
                type: 'stylesheet',
                stylesheet: {
                    source: options.source,
                    rules: rulesList,
                    parsingErrors: errorsList
                }
            };
        }