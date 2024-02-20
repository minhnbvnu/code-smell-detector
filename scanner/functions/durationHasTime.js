function durationHasTime(dur) {
    return Boolean(dur.hours() || dur.minutes() || dur.seconds() || dur.milliseconds());
}