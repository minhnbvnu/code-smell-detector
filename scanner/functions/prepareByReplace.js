function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }