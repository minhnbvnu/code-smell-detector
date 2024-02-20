function extents(el) {
        const style = getComputedStyle(el);
        return {
            border: {
                top: num(style.borderTopWidth),
                bottom: num(style.borderBottomWidth),
                left: num(style.borderLeftWidth),
                right: num(style.borderRightWidth),
            },
            margin: {
                top: num(style.marginTop),
                bottom: num(style.marginBottom),
                left: num(style.marginLeft),
                right: num(style.marginRight),
            },
            padding: {
                top: num(style.paddingTop),
                bottom: num(style.paddingBottom),
                left: num(style.paddingLeft),
                right: num(style.paddingRight),
            },
        };
    }