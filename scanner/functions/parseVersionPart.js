function parseVersionPart(part) {
            if (isNaN(part)) {
                return 0;
            }
            return Math.max(part - 0, 0);
        }