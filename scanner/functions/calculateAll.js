function calculateAll(allElements, layoutOptions) {
        allElements = allElements.filter(shouldIncludeInLayout);
        options = layoutOptions;

        availableSpace.x = options.containerSize.x - options.padding.x - options.padding.z;
        availableSpace.y = options.containerSize.y - options.padding.y - options.padding.w;

        resetAnchors(allElements);

        const lines = reverseLinesIfRequired(splitLines(allElements));
        const sizes = calculateSizesOnAxisB(lines, calculateSizesOnAxisA(lines));
        const positions = calculateBasePositions(lines, sizes);

        applyAlignmentAndPadding(lines, sizes, positions);
        applySizesAndPositions(lines, sizes, positions);

        return createLayoutInfo(lines);
    }