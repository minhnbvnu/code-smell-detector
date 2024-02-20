function createPollingIntervalBasedLevels(levels) {
            return {
                [250 /* Low */]: levels.Low,
                [500 /* Medium */]: levels.Medium,
                [2e3 /* High */]: levels.High
            };
        }