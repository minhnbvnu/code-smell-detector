function renderSingleLineText(gc, config, val, leftPadding, rightPadding) {
    var x = config.bounds.x,
        y = config.bounds.y,
        width = config.bounds.width,
        halignOffset = leftPadding,
        halign = config.halign,
        minWidth,
        metrics;

    if (config.columnAutosizing) {
        metrics = gc.getTextWidthTruncated(val, width - leftPadding, config.truncateTextWithEllipsis);
        minWidth = metrics.width;
        val = metrics.string || val;
        switch (halign) {
            case 'right':
                halignOffset = width - rightPadding - metrics.width;
                break;
            case 'center':
                halignOffset = (width - metrics.width) / 2;
                break;
        }
    } else {
        metrics = gc.getTextWidthTruncated(val, width - leftPadding, config.truncateTextWithEllipsis, true);
        minWidth = 0;
        if (metrics.string !== undefined) {
            val = metrics.string;
        } else {
            switch (halign) {
                case 'right':
                    halignOffset = width - rightPadding - metrics.width;
                    break;
                case 'center':
                    halignOffset = (width - metrics.width) / 2;
                    break;
            }
        }
    }

    if (val !== null) {
        x += Math.max(leftPadding, halignOffset);
        y += Math.floor(config.bounds.height / 2);

        if (config.isUserDataArea) {
            if (config.link) {
                if (config.isCellHovered || !config.linkOnHover) {
                    if (config.linkColor) {
                        gc.cache.strokeStyle = config.linkColor;
                    }
                    gc.beginPath();
                    underline(config, gc, val, x, y, 1);
                    gc.stroke();
                    gc.closePath();
                }
                if (config.linkColor && (config.isCellHovered || !config.linkColorOnHover)) {
                    gc.cache.fillStyle = config.linkColor;
                }
            }

            if (config.strikeThrough === true) {
                gc.beginPath();
                strikeThrough(config, gc, val, x, y, 1);
                gc.stroke();
                gc.closePath();
            }
        }

        gc.cache.textAlign = 'left';
        gc.cache.textBaseline = 'middle';
        gc.simpleText(val, x, y);
    }

    return minWidth;
}