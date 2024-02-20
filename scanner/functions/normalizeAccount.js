function normalizeAccount(a, usages) {
    return {
        id: a.sid,
        name: a.friendlyName,

        uptime: (Date.now() - start),
        phones: config.phones,
        startTime: start,
        profile: team.profile,

        // Status
        status: a.status,

        // Date
        createdTime: a.dateCreated,

        usages: _.chain(usages.usage_records)
            .map(function(u) {
                return [
                    u.category,
                    {
                        value: Number(u.usage),
                        price: Number(u.price),
                        unit: u.usage_unit,
                        label: USAGE_LABELS[u.category]
                    }
                ];
            })
            .object()
            .value()
    };
}