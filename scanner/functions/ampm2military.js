function ampm2military(hour, amPM) {
            return (hour % 12) + 12 * (0, utils_1.int)(amPM === self.l10n.amPM[1]);
        }