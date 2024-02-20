function invert_angle(angle, units, dir = "anticlock") {
        /**
         * Convert CW radians (canvas) to math CCW(default)/CW angle with units.
         */
        const sign = dir == "anticlock" ? 1 : -1;
        return -sign * angle / to_radians_coeff(units);
    }