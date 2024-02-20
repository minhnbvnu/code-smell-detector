function forEachMeasure(cb) {
            durations.forEach((duration, measureName) => cb(measureName, duration));
        }