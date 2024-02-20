function computeValue(value, delta) {
            var computedValue = !isNaN(delta) ? value + delta : value;
            if (computedValue < 0) {
                computedValue = 0;
            } else if (computedValue > 255) {
                computedValue = 255;
            }
    
            computedValue = Math.round(computedValue).toString(16);
            return computedValue.length === 1 ? "0" + computedValue : computedValue;
        }