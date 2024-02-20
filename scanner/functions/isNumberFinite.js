function isNumberFinite(num) {
        if (Number.isFinite) {
            return Number.isFinite(num);
        }

        if (typeof num !== "number") {
            return false;
        }

        return isFinite(num);
    }