function padRight(s, length2, padString = " ") {
            return length2 <= s.length ? s : s + padString.repeat(length2 - s.length);
        }