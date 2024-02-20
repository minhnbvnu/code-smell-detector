function createTimerIf(condition, measureName, startMarkName, endMarkName) {
            return condition ? createTimer(measureName, startMarkName, endMarkName) : nullTimer;
        }