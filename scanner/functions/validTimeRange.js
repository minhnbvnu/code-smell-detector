function validTimeRange(start, end, maxDay) {
    const dayDiff = dayjs(end).diff(dayjs(start), 'days');

    return dayDiff >= 0 && dayDiff <= maxDay;
}