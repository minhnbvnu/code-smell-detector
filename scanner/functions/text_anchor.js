function text_anchor(text_anchor, align, baseline) {
        if (text_anchor != "auto") {
            return anchor(text_anchor);
        }
        else {
            const x_anchor = (() => {
                switch (align) {
                    case "left": return "start";
                    case "center": return "center";
                    case "right": return "end";
                }
            })();
            const y_anchor = (() => {
                switch (baseline) {
                    case "alphabetic":
                    case "ideographic":
                    case "hanging":
                        return "center";
                    case "top": return "start";
                    case "middle": return "center";
                    case "bottom": return "end";
                }
            })();
            return anchor([x_anchor, y_anchor]);
        }
    }