function toStepping(xVal, xPct, value) {
            if (value >= xVal.slice(-1)[0]) {
                return 100;
            }
            var j = getJ(value, xVal);
            var va = xVal[j - 1];
            var vb = xVal[j];
            var pa = xPct[j - 1];
            var pb = xPct[j];
            return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
        }