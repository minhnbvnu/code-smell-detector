function splitLines(allElements) {
        if (!options.wrap) {
            // If wrapping is disabled, we just put all elements into a single line.
            return [allElements];
        }

        const lines = [[]];
        const sizes = getElementSizeProperties(allElements);
        let runningSize = 0;
        const allowOverrun = (options[a.fitting] === FITTING_SHRINK);

        for (let i = 0; i < allElements.length; ++i) {
            if (lines[lines.length - 1].length > 0) {
                runningSize += options.spacing[a.axis];
            }

            const idealElementSize = sizes[i][a.size];
            runningSize += idealElementSize;

            // For the None, Stretch and Both fitting modes, we should break to a new
            // line before we overrun the available space in the container.
            if (!allowOverrun && runningSize > availableSpace[a.axis] && lines[lines.length - 1].length !== 0) {
                runningSize = idealElementSize;
                lines.push([]);
            }

            lines[lines.length - 1].push(allElements[i]);

            // For the Shrink fitting mode, we should break to a new line immediately
            // after we've overrun the available space in the container.
            if (allowOverrun && runningSize > availableSpace[a.axis] && i !== allElements.length - 1) {
                runningSize = 0;
                lines.push([]);
            }
        }

        return lines;
    }