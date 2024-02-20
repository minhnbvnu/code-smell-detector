function date_range_by_month(start_time, end_time) {
        const start_date = (0, util_1.last_month_no_later_than)(new Date(start_time));
        const end_date = (0, util_1.last_month_no_later_than)(new Date(end_time));
        // XXX This is not a reliable technique in general, but it should be
        // safe when the day of the month is 1.  (The problem case is this:
        // Mar 31 -> Apr 31, which becomes May 1.)
        end_date.setUTCMonth(end_date.getUTCMonth() + 1);
        const dates = [];
        const date = start_date;
        while (true) {
            dates.push((0, util_1.copy_date)(date));
            date.setUTCMonth(date.getUTCMonth() + 1);
            if (date > end_date)
                break;
        }
        return dates;
    }