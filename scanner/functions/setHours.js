function setHours(hours, minutes, seconds) {
            if (self.latestSelectedDateObj !== undefined) {
                self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
            }
            if (!self.hourElement || !self.minuteElement || self.isMobile)
                return;
            self.hourElement.value = (0, utils_1.pad)(!self.config.time_24hr
                ? ((12 + hours) % 12) + 12 * (0, utils_1.int)(hours % 12 === 0)
                : hours);
            self.minuteElement.value = (0, utils_1.pad)(minutes);
            if (self.amPM !== undefined)
                self.amPM.textContent = self.l10n.amPM[(0, utils_1.int)(hours >= 12)];
            if (self.secondElement !== undefined)
                self.secondElement.value = (0, utils_1.pad)(seconds);
        }