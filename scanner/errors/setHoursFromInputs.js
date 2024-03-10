function setHoursFromInputs() {
            if (self.hourElement === undefined || self.minuteElement === undefined)
                return;
            var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                ? (parseInt(self.secondElement.value, 10) || 0) % 60
                : 0;
            if (self.amPM !== undefined) {
                hours = ampm2military(hours, self.amPM.textContent);
            }
            var limitMinHours = self.config.minTime !== undefined ||
                (self.config.minDate &&
                    self.minDateHasTime &&
                    self.latestSelectedDateObj &&
                    (0, dates_1.compareDates)(self.latestSelectedDateObj, self.config.minDate, true) ===
                        0);
            var limitMaxHours = self.config.maxTime !== undefined ||
                (self.config.maxDate &&
                    self.maxDateHasTime &&
                    self.latestSelectedDateObj &&
                    (0, dates_1.compareDates)(self.latestSelectedDateObj, self.config.maxDate, true) ===
                        0);
            if (self.config.maxTime !== undefined &&
                self.config.minTime !== undefined &&
                self.config.minTime > self.config.maxTime) {
                var minBound = (0, dates_1.calculateSecondsSinceMidnight)(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
                var maxBound = (0, dates_1.calculateSecondsSinceMidnight)(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
                var currentTime = (0, dates_1.calculateSecondsSinceMidnight)(hours, minutes, seconds);
                if (currentTime > maxBound && currentTime < minBound) {
                    var result = (0, dates_1.parseSeconds)(minBound);
                    hours = result[0];
                    minutes = result[1];
                    seconds = result[2];
                }
            }
            else {
                if (limitMaxHours) {
                    var maxTime = self.config.maxTime !== undefined
                        ? self.config.maxTime
                        : self.config.maxDate;
                    hours = Math.min(hours, maxTime.getHours());
                    if (hours === maxTime.getHours())
                        minutes = Math.min(minutes, maxTime.getMinutes());
                    if (minutes === maxTime.getMinutes())
                        seconds = Math.min(seconds, maxTime.getSeconds());
                }
                if (limitMinHours) {
                    var minTime = self.config.minTime !== undefined
                        ? self.config.minTime
                        : self.config.minDate;
                    hours = Math.max(hours, minTime.getHours());
                    if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                        minutes = minTime.getMinutes();
                    if (minutes === minTime.getMinutes())
                        seconds = Math.max(seconds, minTime.getSeconds());
                }
            }
            setHours(hours, minutes, seconds);
        }