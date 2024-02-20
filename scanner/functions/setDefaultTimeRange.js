function setDefaultTimeRange(start, end, maxDay) {
    const endTime = end || new Date().toISOString();
    const startTime = start || dayjs(endTime).subtract(maxDay, 'days').toISOString();

    return { startTime, endTime };
}