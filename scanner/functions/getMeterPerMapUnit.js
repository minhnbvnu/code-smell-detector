function getMeterPerMapUnit(mapUnit) {
            var meterPerMapUnit = 1;
            if (mapUnit === "meter") {
                meterPerMapUnit = 1;
            } else if (mapUnit === "degrees") {
                // 每度表示多少米。
                meterPerMapUnit = (Math.PI * 2 * earchRadiusInMeters) / 360;
            } else if (mapUnit === "kilometer") {
                meterPerMapUnit = 1.0e-3;
            } else if (mapUnit === "inch") {
                meterPerMapUnit = 1 / 2.5399999918e-2;
            } else if (mapUnit === "feet") {
                meterPerMapUnit = 0.3048;
            }
            return meterPerMapUnit;
        }