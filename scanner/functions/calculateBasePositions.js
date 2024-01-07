function calculateBasePositions(lines, sizes) {
        const cursor = {};
        cursor[a.axis] = 0;
        cursor[b.axis] = 0;

        lines[a.size] = Number.NEGATIVE_INFINITY;

        const positionsAllLines = [];

        for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            const line = lines[lineIndex];

            if (line.length === 0) {
                positionsAllLines.push([]);
                continue;
            }

            const positionsThisLine = [];
            const sizesThisLine = sizes[lineIndex];

            // Distribute elements along the line
            for (let elementIndex = 0; elementIndex < line.length; ++elementIndex) {
                const element = line[elementIndex];
                const sizesThisElement = sizesThisLine[elementIndex];

                cursor[b.axis] -= minExtentB(element, sizesThisElement);
                cursor[a.axis] -= minExtentA(element, sizesThisElement);

                positionsThisLine[elementIndex] = {};
                positionsThisLine[elementIndex][a.axis] = cursor[a.axis];
                positionsThisLine[elementIndex][b.axis] = cursor[b.axis];

                cursor[b.axis] += minExtentB(element, sizesThisElement);
                cursor[a.axis] += maxExtentA(element, sizesThisElement) + options.spacing[a.axis];
            }

            // Record the size of the overall line
            line[a.size] = cursor[a.axis] - options.spacing[a.axis];
            line[b.size] = line.largestSize[b.size];

            // Keep track of the longest line
            lines[a.size] = Math.max(lines[a.size], line[a.size]);

            // Move the cursor to the next line
            cursor[a.axis] = 0;
            cursor[b.axis] += line[b.size] + options.spacing[b.axis];

            positionsAllLines.push(positionsThisLine);
        }

        // Record the size of the full set of lines
        lines[b.size] = cursor[b.axis] - options.spacing[b.axis];

        return positionsAllLines;
    }