function compileEventUis(eventDefs, eventUiBases) {
        return mapHash(eventDefs, function (eventDef) {
            return compileEventUi(eventDef, eventUiBases);
        });
    }