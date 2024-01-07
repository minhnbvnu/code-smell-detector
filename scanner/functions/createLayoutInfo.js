function createLayoutInfo(lines) {
        const layoutWidth = lines.width;
        const layoutHeight = lines.height;

        const xOffset = (availableSpace.x - layoutWidth) * options.alignment.x + options.padding.x;
        const yOffset = (availableSpace.y - layoutHeight) * options.alignment.y + options.padding.y;

        return {
            bounds: new Vec4(
                xOffset,
                yOffset,
                layoutWidth,
                layoutHeight
            )
        };
    }