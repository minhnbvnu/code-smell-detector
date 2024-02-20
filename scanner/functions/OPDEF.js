function OPDEF(lspace, rspace, texClass, properties) {
        if (texClass === void 0) {
            texClass = MmlNode_js_1.TEXCLASS.BIN;
        }
        if (properties === void 0) {
            properties = null;
        }
        return [lspace, rspace, texClass, properties];
    }