function buildWeekdays() {
            if (!self.weekdayContainer)
                self.weekdayContainer = (0, dom_1.createElement)("div", "flatpickr-weekdays");
            else
                (0, dom_1.clearNode)(self.weekdayContainer);
            for (var i = self.config.showMonths; i--;) {
                var container = (0, dom_1.createElement)("div", "flatpickr-weekdaycontainer");
                self.weekdayContainer.appendChild(container);
            }
            updateWeekdays();
            return self.weekdayContainer;
        }