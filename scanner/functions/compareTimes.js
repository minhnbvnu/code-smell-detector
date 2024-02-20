function compareTimes(date1, date2) {
        return (3600 * (date1.getHours() - date2.getHours()) +
            60 * (date1.getMinutes() - date2.getMinutes()) +
            date1.getSeconds() -
            date2.getSeconds());
    }