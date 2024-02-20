function UIColorToHexString(inUIColor) {
        var s = "";
        try {
            if (typeof inUIColor == "undefined") return "undefined";
            if (inUIColor.type != 1) return "type:" + inUIColor.type;
            s += inUIColor.color.red.toString(16);
            s += inUIColor.color.green.toString(16);
            s += inUIColor.color.blue.toString(16);
        } catch (e) {
            s = e.toString();
        }
        return s;
    }