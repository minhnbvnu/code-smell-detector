function isSingleDay(dur) {
        return dur.years === 0 && dur.months === 0 && dur.days === 1 && dur.milliseconds === 0;
    }