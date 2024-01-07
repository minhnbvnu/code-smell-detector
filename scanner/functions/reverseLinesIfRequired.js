function reverseLinesIfRequired(lines) {
        const reverseAxisA = (options.orientation === ORIENTATION_HORIZONTAL && options.reverseX) ||
                             (options.orientation === ORIENTATION_VERTICAL   && options.reverseY);

        const reverseAxisB = (options.orientation === ORIENTATION_HORIZONTAL && options.reverseY) ||
                             (options.orientation === ORIENTATION_VERTICAL   && options.reverseX);

        if (reverseAxisA) {
            for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
                if (reverseAxisA) {
                    lines[lineIndex].reverse();
                }
            }
        }

        if (reverseAxisB) {
            lines.reverse();
        }

        return lines;
    }