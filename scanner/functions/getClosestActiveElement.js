function getClosestActiveElement() {
            var _a;
            return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
                .activeElement || document.activeElement);
        }