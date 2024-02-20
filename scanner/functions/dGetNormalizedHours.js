function dGetNormalizedHours(hours) {
    let pad = Object.fromEntries(
        [...Array(24).keys()].map((i) => [HOUR_AM_PM[i], 0])
    );
    let formatedHours = Object.fromEntries(
        Object.entries(hours).map((i) => [HOUR_AM_PM[i[0]], i[1]])
    );
    return {
        ...pad,
        ...formatedHours,
    };
}