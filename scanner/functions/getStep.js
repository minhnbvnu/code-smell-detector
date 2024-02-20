function getStep(xPct, xSteps, snap, value) {
            if (value === 100) {
                return value;
            }
            var j = getJ(value, xPct);
            var a = xPct[j - 1];
            var b = xPct[j];
            // If 'snap' is set, steps are used as fixed points on the slider.
            if (snap) {
                // Find the closest position, a or b.
                if (value - a > (b - a) / 2) {
                    return b;
                }
                return a;
            }
            if (!xSteps[j - 1]) {
                return value;
            }
            return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
        }