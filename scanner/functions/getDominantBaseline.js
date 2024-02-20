function getDominantBaseline(textBaseline) {
        // INFO: not supported in all browsers
        const mapping = { alphabetic: "alphabetic", hanging: "hanging", top: "text-before-edge", bottom: "text-after-edge", middle: "central" };
        return textBaseline in mapping ? mapping[textBaseline] : mapping.alphabetic;
    }