function getElementSizeProperties(elements) {
        const sizeProperties = [];

        for (let i = 0; i < elements.length; ++i) {
            const element = elements[i];
            const minWidth  = Math.max(getProperty(element, 'minWidth'), 0);
            const minHeight = Math.max(getProperty(element, 'minHeight'), 0);
            const maxWidth  = Math.max(getProperty(element, 'maxWidth'), minWidth);
            const maxHeight = Math.max(getProperty(element, 'maxHeight'), minHeight);
            const width  = clamp(getProperty(element, 'width'), minWidth, maxWidth);
            const height = clamp(getProperty(element, 'height'), minHeight, maxHeight);
            const fitWidthProportion  = getProperty(element, 'fitWidthProportion');
            const fitHeightProportion = getProperty(element, 'fitHeightProportion');

            sizeProperties.push({
                minWidth: minWidth,
                minHeight: minHeight,
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                width: width,
                height: height,
                fitWidthProportion: fitWidthProportion,
                fitHeightProportion: fitHeightProportion
            });
        }

        return sizeProperties;
    }