function anchor(anchor) {
        if ((0, types_1.isString)(anchor)) {
            switch (anchor) {
                case "top_left": return { x: 0.0, y: 0.0 };
                case "top":
                case "top_center": return { x: 0.5, y: 0.0 };
                case "top_right": return { x: 1.0, y: 0.0 };
                case "right":
                case "center_right": return { x: 1.0, y: 0.5 };
                case "bottom_right": return { x: 1.0, y: 1.0 };
                case "bottom":
                case "bottom_center": return { x: 0.5, y: 1.0 };
                case "bottom_left": return { x: 0.0, y: 1.0 };
                case "left":
                case "center_left": return { x: 0.0, y: 0.5 };
                case "center":
                case "center_center": return { x: 0.5, y: 0.5 };
            }
        }
        else {
            const x_anchor = (() => {
                const [x_anchor] = anchor;
                switch (x_anchor) {
                    case "start":
                    case "left": return 0.0;
                    case "center": return 0.5;
                    case "end":
                    case "right": return 1.0;
                    default:
                        return x_anchor;
                }
            })();
            const y_anchor = (() => {
                const [, y_anchor] = anchor;
                switch (y_anchor) {
                    case "start":
                    case "top": return 0.0;
                    case "center": return 0.5;
                    case "end":
                    case "bottom": return 1.0;
                    default:
                        return y_anchor;
                }
            })();
            return { x: x_anchor, y: y_anchor };
        }
    }