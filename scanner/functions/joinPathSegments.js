function joinPathSegments(a, b, separator) {
        if (a === '') {
            return b;
        }
        /**
         * The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
         */
        if (a.endsWith(separator)) {
            return a + b;
        }
        return a + separator + b;
    }