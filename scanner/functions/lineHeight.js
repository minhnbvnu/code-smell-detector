function lineHeight(element) {
        var _a, _b, _c;
        const parent = (_a = element.offsetParent) !== null && _a !== void 0 ? _a : document.body;
        return (_c = (_b = fontSize(parent)) !== null && _b !== void 0 ? _b : fontSize(element)) !== null && _c !== void 0 ? _c : 16;
    }