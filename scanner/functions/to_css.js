function to_css(value) {
                return (0, types_1.isNumber)(value) ? (0, dom_1.px)(value) : `${value.percent}%`;
            }