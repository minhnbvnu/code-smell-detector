function getTextAnchor(textAlign) {
        // TODO: support rtl languages
        const mapping = { left: "start", right: "end", center: "middle", start: "start", end: "end" };
        return textAlign in mapping ? mapping[textAlign] : mapping.start;
    }