function statisticsWriter() {
    statisticsInitializer();

    if (isTimerWin) {
        if (isOnlyRest) {
            let onlyRestTimePeriod = Math.floor((tempDate.getTime() - recorderDate.getTime()) / 60000);
            recorderDate = tempDate;
            statistics.set(yearMonDay, {
                "workTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).workTime : 0,
                "restTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).restTime : 0,
                "positive": statistics.has(yearMonDay) ? statistics.get(yearMonDay).positive : 0,
                "onlyRest": statistics.has(yearMonDay) ? statistics.get(yearMonDay).onlyRest + onlyRestTimePeriod : onlyRestTimePeriod,
                "sum": statistics.has(yearMonDay) ? statistics.get(yearMonDay).sum + onlyRestTimePeriod : onlyRestTimePeriod
            });
            statistics.set(yearAndMon, {
                "workTime": statistics.has(yearAndMon) ? statistics.get(yearAndMon).workTime : 0,
                "restTime": statistics.has(yearAndMon) ? statistics.get(yearAndMon).restTime : 0,
                "positive": statistics.has(yearAndMon) ? statistics.get(yearAndMon).positive : 0,
                "onlyRest": statistics.has(yearAndMon) ? statistics.get(yearAndMon).onlyRest + onlyRestTimePeriod : onlyRestTimePeriod,
                "sum": statistics.has(yearAndMon) ? statistics.get(yearAndMon).sum + onlyRestTimePeriod : onlyRestTimePeriod
            });
            statistics.set(year, {
                "workTime": statistics.has(year) ? statistics.get(year).workTime : 0,
                "restTime": statistics.has(year) ? statistics.get(year).restTime : 0,
                "positive": statistics.has(year) ? statistics.get(year).positive : 0,
                "onlyRest": statistics.has(year) ? statistics.get(year).onlyRest + onlyRestTimePeriod : onlyRestTimePeriod,
                "sum": statistics.has(year) ? statistics.get(year).sum + onlyRestTimePeriod : onlyRestTimePeriod,
            });
        } else if (isPositiveTiming) {
            let positiveTimePeriod = Math.floor((tempDate.getTime() - recorderDate.getTime()) / 60000);
            recorderDate = tempDate;
            statistics.set(yearMonDay, {
                "workTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).workTime : 0,
                "restTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).restTime : 0,
                "positive": statistics.has(yearMonDay) ? statistics.get(yearMonDay).positive + positiveTimePeriod : positiveTimePeriod,
                "onlyRest": statistics.has(yearMonDay) ? statistics.get(yearMonDay).onlyRest : 0,
                "sum": statistics.has(yearMonDay) ? statistics.get(yearMonDay).sum + positiveTimePeriod : positiveTimePeriod
            });
            statistics.set(yearAndMon, {
                "workTime": statistics.has(yearAndMon) ? statistics.get(yearAndMon).workTime : 0,
                "restTime": statistics.has(yearAndMon) ? statistics.get(yearAndMon).restTime : 0,
                "positive": statistics.has(yearAndMon) ? statistics.get(yearAndMon).positive + positiveTimePeriod : positiveTimePeriod,
                "onlyRest": statistics.has(yearAndMon) ? statistics.get(yearAndMon).onlyRest : 0,
                "sum": statistics.has(yearAndMon) ? statistics.get(yearAndMon).sum + positiveTimePeriod : positiveTimePeriod
            });
            statistics.set(year, {
                "workTime": statistics.has(year) ? statistics.get(year).workTime : 0,
                "restTime": statistics.has(year) ? statistics.get(year).restTime : 0,
                "positive": statistics.has(year) ? statistics.get(year).positive + positiveTimePeriod : positiveTimePeriod,
                "onlyRest": statistics.has(year) ? statistics.get(year).onlyRest : 0,
                "sum": statistics.has(year) ? statistics.get(year).sum + positiveTimePeriod : positiveTimePeriod,
            });
        } else if (isWorkMode) {
            let workTimePeriod = Math.floor((tempDate.getTime() - recorderDate.getTime()) / 60000);
            recorderDate = tempDate;
            statistics.set(yearMonDay, {
                "workTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).workTime + workTimePeriod : workTimePeriod,
                "restTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).restTime : 0,
                "positive": statistics.has(yearMonDay) ? statistics.get(yearMonDay).positive : 0,
                "onlyRest": statistics.has(yearMonDay) ? statistics.get(yearMonDay).onlyRest : 0,
                "sum": statistics.has(yearMonDay) ? statistics.get(yearMonDay).sum + workTimePeriod : workTimePeriod
            });
            statistics.set(yearAndMon, {
                "workTime": statistics.has(yearAndMon) ? statistics.get(yearAndMon).workTime + workTimePeriod : workTimePeriod,
                "restTime": statistics.has(yearAndMon) ? statistics.get(yearAndMon).restTime : 0,
                "positive": statistics.has(yearAndMon) ? statistics.get(yearAndMon).positive : 0,
                "onlyRest": statistics.has(yearAndMon) ? statistics.get(yearAndMon).onlyRest : 0,
                "sum": statistics.has(yearAndMon) ? statistics.get(yearAndMon).sum + workTimePeriod : workTimePeriod
            });
            statistics.set(year, {
                "workTime": statistics.has(year) ? statistics.get(year).workTime + workTimePeriod : workTimePeriod,
                "restTime": statistics.has(year) ? statistics.get(year).restTime : 0,
                "positive": statistics.has(year) ? statistics.get(year).positive : 0,
                "onlyRest": statistics.has(year) ? statistics.get(year).onlyRest : 0,
                "sum": statistics.has(year) ? statistics.get(year).sum + workTimePeriod : workTimePeriod
            });
        } else {
            let restTimePeriod = Math.floor((tempDate.getTime() - recorderDate.getTime()) / 60000);
            recorderDate = tempDate;
            statistics.set(yearMonDay, {
                "workTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).workTime : 0,
                "restTime": statistics.has(yearMonDay) ? statistics.get(yearMonDay).restTime + restTimePeriod : restTimePeriod,
                "positive": statistics.has(yearMonDay) ? statistics.get(yearMonDay).positive : 0,
                "onlyRest": statistics.has(yearMonDay) ? statistics.get(yearMonDay).onlyRest : 0,
                "sum": statistics.has(yearMonDay) ? statistics.get(yearMonDay).sum + restTimePeriod : restTimePeriod
            });
            statistics.set(yearAndMon, {
                "workTime": statistics.has(yearAndMon) ? statistics.get(yearAndMon).workTime : 0,
                "restTime": statistics.has(yearAndMon) ? statistics.get(yearAndMon).restTime + restTimePeriod : restTimePeriod,
                "positive": statistics.has(yearAndMon) ? statistics.get(yearAndMon).positive : 0,
                "onlyRest": statistics.has(yearAndMon) ? statistics.get(yearAndMon).onlyRest : 0,
                "sum": statistics.has(yearAndMon) ? statistics.get(yearAndMon).sum + restTimePeriod : restTimePeriod
            });
            statistics.set(year, {
                "workTime": statistics.has(year) ? statistics.get(year).workTime : 0,
                "restTime": statistics.has(year) ? statistics.get(year).restTime + restTimePeriod : restTimePeriod,
                "positive": statistics.has(year) ? statistics.get(year).positive : 0,
                "onlyRest": statistics.has(year) ? statistics.get(year).onlyRest : 0,
                "sum": statistics.has(year) ? statistics.get(year).sum + restTimePeriod : restTimePeriod
            });
        }
    }

    todaySum = statistics.has(yearMonDay) ? statistics.get(yearMonDay).sum : 0;
}