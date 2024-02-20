function subtractDates(date1, date0) {
            if (largeUnit) {
                return util_1.diffByUnit(date1, date0, largeUnit); // poorly named
            }
            else if (dateProfile1.isAllDay()) {
                return util_1.diffDay(date1, date0); // poorly named
            }
            else {
                return util_1.diffDayTime(date1, date0); // poorly named
            }
        }