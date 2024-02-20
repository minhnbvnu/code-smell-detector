function getNumberOfLinesBetween(left, right) {
                return Math.max(right.loc.start.line - left.loc.end.line - 1, 0);
            }