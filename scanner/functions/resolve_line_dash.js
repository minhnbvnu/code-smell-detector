function resolve_line_dash(line_dash) {
        if ((0, types_1.isArray)(line_dash))
            return line_dash;
        else {
            switch (line_dash) {
                case "solid": return [];
                case "dashed": return [6];
                case "dotted": return [2, 4];
                case "dotdash": return [2, 4, 6, 4];
                case "dashdot": return [6, 4, 2, 4];
                default:
                    return line_dash.split(" ").map(Number).filter(types_1.isInteger);
            }
        }
    }