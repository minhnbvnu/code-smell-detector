function isDateInRange(date) {
            if (self.config.mode !== "range" || self.selectedDates.length < 2)
                return false;
            return ((0, dates_1.compareDates)(date, self.selectedDates[0]) >= 0 &&
                (0, dates_1.compareDates)(date, self.selectedDates[1]) <= 0);
        }