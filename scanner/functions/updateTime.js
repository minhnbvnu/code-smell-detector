function updateTime(e) {
            if (self.selectedDates.length === 0) {
                var defaultDate = self.config.minDate === undefined ||
                    (0, dates_1.compareDates)(new Date(), self.config.minDate) >= 0
                    ? new Date()
                    : new Date(self.config.minDate.getTime());
                var defaults = (0, dates_1.getDefaultHours)(self.config);
                defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
                self.selectedDates = [defaultDate];
                self.latestSelectedDateObj = defaultDate;
            }
            if (e !== undefined && e.type !== "blur") {
                timeWrapper(e);
            }
            var prevValue = self._input.value;
            setHoursFromInputs();
            updateValue();
            if (self._input.value !== prevValue) {
                self._debouncedChange();
            }
        }