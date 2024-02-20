function statisticsInitializer() {
    tempDate = new Date();

    year = tempDate.getFullYear().toString();
    yearAndMon = year + months[tempDate.getMonth()];//"mon" represents month
    yearMonDay = yearAndMon + tempDate.getDate().toString();
    statistics.set("year", year);
    statistics.set("mon", months[tempDate.getMonth()]);
    statistics.set("day", tempDate.getDate().toString());
    statistics.set(yearMonDay, {
        "workTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).workTime : 0,
        "restTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).restTime : 0,
        "positive": statistics.has(yearMonDay) ? statistics.get(yearMonDay).positive : 0,
        "onlyRest": statistics.has(yearMonDay) ? statistics.get(yearMonDay).onlyRest : 0,
        "sum": statistics.has(yearMonDay) ? statistics.get(yearMonDay).sum : 0
    });
}