function getStyledTimeForTray(minute) {
    minute = Number(minute);
    if (minute <= 60)
        return minute + " " + i18n.__("min");
    else
        return Math.floor(minute / 60) + " " + i18n.__("h") +
            (minute - Math.floor(minute / 60) * 60) + i18n.__("min");
}