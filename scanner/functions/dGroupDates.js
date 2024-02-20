function dGroupDates(dates) {
    let allMonths = Object.entries(dates).reduce((acc, val) => {
        let group = moment(val[0]).format("MMMM YYYY");
        acc.add(group);
        return acc;
    }, new Set());

    let groupedByMonth = Object.entries(dates).reduce((acc, val) => {
        let group;
        if (allMonths.size <= 12) {
            group = moment(val[0]).format("MMMM");
        } else {
            group = moment(val[0]).format("MMM YYYY");
        }
        acc[group] = (acc[group] || 0) + val[1];
        return acc;
    }, {});

    let groupedByWeek = Object.entries(dates).reduce((acc, val) => {
        let group = moment(val[0]).format("[CW]w");
        acc[group] = (acc[group] || 0) + val[1];
        return acc;
    }, {});

    var groupedDates = dates;
    if (Object.keys(groupedDates).length > 31) {
        groupedDates = groupedByWeek;
        // if it's still to big, use months. 16 is a magic number to swap to the per month view
        if (Object.keys(groupedDates).length > 16) {
            groupedDates = groupedByMonth;
        }
    }

    return [Object.keys(groupedDates), Object.values(groupedDates)];
}