function processScopedUiProps(prefix, rawScoped, calendar, leftovers) {
        var rawUnscoped = {};
        var wasFound = {};
        for (var key in UNSCOPED_EVENT_UI_PROPS) {
            var scopedKey = prefix + capitaliseFirstLetter(key);
            rawUnscoped[key] = rawScoped[scopedKey];
            wasFound[scopedKey] = true;
        }
        if (prefix === 'event') {
            rawUnscoped.editable = rawScoped.editable; // special case. there is no 'eventEditable', just 'editable'
        }
        if (leftovers) {
            for (var key in rawScoped) {
                if (!wasFound[key]) {
                    leftovers[key] = rawScoped[key];
                }
            }
        }
        return processUnscopedUiProps(rawUnscoped, calendar);
    }