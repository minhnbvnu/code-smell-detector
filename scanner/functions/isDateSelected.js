function isDateSelected(date) {
            for (var i = 0; i < self.selectedDates.length; i++) {
                var selectedDate = self.selectedDates[i];
                if (selectedDate instanceof Date &&
                    (0, dates_1.compareDates)(selectedDate, date) === 0)
                    return "" + i;
            }
            return false;
        }