function toJulian(date) {
            return date.valueOf() / dayMs - 0.5 + J1970;
        }