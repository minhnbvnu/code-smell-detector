function filterLegacyEventInstances(legacyEventInstances, legacyQuery) {
    if (legacyQuery == null) {
        return legacyEventInstances;
    }
    else if ($.isFunction(legacyQuery)) {
        return legacyEventInstances.filter(legacyQuery);
    }
    else {
        legacyQuery += ''; // normalize to string
        return legacyEventInstances.filter(function (legacyEventInstance) {
            // soft comparison because id not be normalized to string
            // tslint:disable-next-line
            return legacyEventInstance.id == legacyQuery ||
                legacyEventInstance._id === legacyQuery; // can specify internal id, but must exactly match
        });
    }
}