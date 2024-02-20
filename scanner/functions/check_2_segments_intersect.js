function check_2_segments_intersect(l0_x0, l0_y0, l0_x1, l0_y1, l1_x0, l1_y0, l1_x1, l1_y1) {
        /*
         *  Check if 2 segments (l0 and l1) intersect. Returns a structure with
         *  the following attributes:
         *   * hit (boolean): whether the 2 segments intersect
         *   * x (float): x coordinate of the intersection point
         *   * y (float): y coordinate of the intersection point
         */
        const den = ((l1_y1 - l1_y0) * (l0_x1 - l0_x0)) - ((l1_x1 - l1_x0) * (l0_y1 - l0_y0));
        if (den == 0) {
            return { hit: false, x: null, y: null };
        }
        else {
            let a = l0_y0 - l1_y0;
            let b = l0_x0 - l1_x0;
            const num1 = ((l1_x1 - l1_x0) * a) - ((l1_y1 - l1_y0) * b);
            const num2 = ((l0_x1 - l0_x0) * a) - ((l0_y1 - l0_y0) * b);
            a = num1 / den;
            b = num2 / den;
            const x = l0_x0 + (a * (l0_x1 - l0_x0));
            const y = l0_y0 + (a * (l0_y1 - l0_y0));
            return { hit: (a > 0 && a < 1) && (b > 0 && b < 1), x, y };
        }
    }