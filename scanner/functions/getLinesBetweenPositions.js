function getLinesBetweenPositions(sourceFile, pos1, pos2) {
            if (pos1 === pos2)
                return 0;
            const lineStarts = getLineStarts(sourceFile);
            const lower = Math.min(pos1, pos2);
            const isNegative = lower === pos2;
            const upper = isNegative ? pos1 : pos2;
            const lowerLine = computeLineOfPosition(lineStarts, lower);
            const upperLine = computeLineOfPosition(lineStarts, upper, lowerLine);
            return isNegative ? lowerLine - upperLine : upperLine - lowerLine;
        }