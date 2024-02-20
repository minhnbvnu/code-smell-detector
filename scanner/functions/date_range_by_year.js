function date_range_by_year(start_time, end_time) {
        const start_date = (0, util_1.last_year_no_later_than)(new Date(start_time));
        const end_date = (0, util_1.last_year_no_later_than)(new Date(end_time));
        end_date.setUTCFullYear(end_date.getUTCFullYear() + 1);
        const dates = [];
        const date = start_date;
        while (true) {
            dates.push((0, util_1.copy_date)(date));
            date.setUTCFullYear(date.getUTCFullYear() + 1);
            if (date > end_date)
                break;
        }
        return dates;
    }