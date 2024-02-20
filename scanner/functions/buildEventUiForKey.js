function buildEventUiForKey(allUi, eventUiForKey, individualUi) {
        var baseParts = [];
        if (allUi) {
            baseParts.push(allUi);
        }
        if (eventUiForKey) {
            baseParts.push(eventUiForKey);
        }
        var stuff = {
            '': combineEventUis(baseParts)
        };
        if (individualUi) {
            __assign(stuff, individualUi);
        }
        return stuff;
    }