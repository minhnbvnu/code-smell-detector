function buildMonthSwitch() {
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType !== "dropdown")
                return;
            var shouldBuildMonth = function (month) {
                if (self.config.minDate !== undefined &&
                    self.currentYear === self.config.minDate.getFullYear() &&
                    month < self.config.minDate.getMonth()) {
                    return false;
                }
                return !(self.config.maxDate !== undefined &&
                    self.currentYear === self.config.maxDate.getFullYear() &&
                    month > self.config.maxDate.getMonth());
            };
            self.monthsDropdownContainer.tabIndex = -1;
            self.monthsDropdownContainer.innerHTML = "";
            for (var i = 0; i < 12; i++) {
                if (!shouldBuildMonth(i))
                    continue;
                var month = (0, dom_1.createElement)("option", "flatpickr-monthDropdown-month");
                month.value = new Date(self.currentYear, i).getMonth().toString();
                month.textContent = (0, formatting_1.monthToStr)(i, self.config.shorthandCurrentMonth, self.l10n);
                month.tabIndex = -1;
                if (self.currentMonth === i) {
                    month.selected = true;
                }
                self.monthsDropdownContainer.appendChild(month);
            }
        }