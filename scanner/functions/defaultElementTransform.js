function defaultElementTransform(element) {
        try {
            return { boundingClientRect: Object.assign({}, element.getBoundingClientRect()) };
        }
        catch (_a) {
            return {};
        }
    }