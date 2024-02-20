function getCurrentSubs(subs, beginTime, duration) {
    return subs.filter((item) => {
        return (
            (item.startTime >= beginTime && item.startTime <= beginTime + duration) ||
            (item.endTime >= beginTime && item.endTime <= beginTime + duration) ||
            (item.startTime < beginTime && item.endTime > beginTime + duration)
        );
    });
}