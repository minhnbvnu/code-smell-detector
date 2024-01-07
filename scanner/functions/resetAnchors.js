function resetAnchors(allElements) {
        for (let i = 0; i < allElements.length; ++i) {
            const element = allElements[i];
            const anchor = element.anchor;

            if (anchor.x !== 0 || anchor.y !== 0 || anchor.z !== 0 || anchor.w !== 0) {
                element.anchor = Vec4.ZERO;
            }
        }
    }