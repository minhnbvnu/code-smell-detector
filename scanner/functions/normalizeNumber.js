function normalizeNumber(num, incoming) {
    if (num.indexOf(CLIENT_PREFIX) === 0) {
        num = num.slice(CLIENT_PREFIX.length);
    }

    var toMember = team.get(num);

    // Unknown entry
    if (!phone.valid(num) && !toMember) {
        num = null;
    }

    // If no num, then it's for betty
    if (!num || num == 'Anonymous') {
        if (incoming) {
            return {
                alias: "Anonymous"
            };
        }

        toMember = team.betty();
    }

    return {
        phone: phone.valid(num)? phone.normalize(num) : (toMember? toMember.phone : num),
        member: toMember
    };
}