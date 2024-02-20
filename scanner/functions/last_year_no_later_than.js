function last_year_no_later_than(date) {
        const new_date = last_month_no_later_than(date);
        new_date.setUTCMonth(0);
        return new_date;
    }