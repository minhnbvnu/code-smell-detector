function isSorted(line) {
            for (let j = 1; j < line.length; j++) {
                if (line[j][COLUMN$1] < line[j - 1][COLUMN$1]) {
                    return false;
                }
            }
            return true;
        }