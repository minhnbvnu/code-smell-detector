function last_month_no_later_than(date) {
        const new_date = copy_date(date);
        new_date.setUTCDate(1);
        new_date.setUTCHours(0);
        new_date.setUTCMinutes(0);
        new_date.setUTCSeconds(0);
        new_date.setUTCMilliseconds(0);
        return new_date;
    }