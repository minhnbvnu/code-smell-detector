function compute_angle(angle, units, dir = "anticlock") {
        /**
         * Convert math CCW(default)/CW angle with units to CW radians (canvas).
         */
        const sign = dir == "anticlock" ? 1 : -1;
        return -sign * angle * to_radians_coeff(units);
    }