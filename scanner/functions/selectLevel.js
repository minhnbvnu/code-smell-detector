function selectLevel(source, requestExtent, requestWidth, requestHeight) {
    // Number of images  = original + overviews if any
    const cropped = requestExtent.clone().intersect(source.extent);
    // Dimensions of the requested extent
    const extentDimension = cropped.planarDimensions();

    const targetResolution = Math.min(
        extentDimension.x / requestWidth,
        extentDimension.y / requestHeight,
    );

    let level;

    // Select the image with the best resolution for our needs
    for (let index = source.levels.length - 1; index >= 0; index--) {
        level = source.levels[index];
        const sourceResolution = Math.min(
            source.dimensions.x / level.width,
            source.dimensions.y / level.height,
        );

        if (targetResolution >= sourceResolution) {
            break;
        }
    }

    return level;
}