function buildWeeks() {
            self.calendarContainer.classList.add("hasWeeks");
            var weekWrapper = (0, dom_1.createElement)("div", "flatpickr-weekwrapper");
            weekWrapper.appendChild((0, dom_1.createElement)("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
            var weekNumbers = (0, dom_1.createElement)("div", "flatpickr-weeks");
            weekWrapper.appendChild(weekNumbers);
            return {
                weekWrapper: weekWrapper,
                weekNumbers: weekNumbers,
            };
        }