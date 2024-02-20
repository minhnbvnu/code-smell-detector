function calculateRatio(row, length) {
            var min = Math.min.apply(Math, row);
            var max = Math.max.apply(Math, row);
            var sum = sumArray(row);
            return Math.max(Math.pow(length, 2) * max / Math.pow(sum, 2), Math.pow(sum, 2) / (Math.pow(length, 2) * min));
        }