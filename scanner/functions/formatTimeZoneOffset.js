function formatTimeZoneOffset(minutes, doIso) {
        if (doIso === void 0) { doIso = false; }
        var sign = minutes < 0 ? '-' : '+';
        var abs = Math.abs(minutes);
        var hours = Math.floor(abs / 60);
        var mins = Math.round(abs % 60);
        if (doIso) {
            return sign + padStart(hours, 2) + ':' + padStart(mins, 2);
        }
        else {
            return 'GMT' + sign + hours + (mins ? ':' + padStart(mins, 2) : '');
        }
    }