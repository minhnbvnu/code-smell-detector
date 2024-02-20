function fromPercentage(range, value, startRange) {
            return (value * 100) / (range[startRange + 1] - range[startRange]);
        }