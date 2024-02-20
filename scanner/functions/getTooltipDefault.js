function getTooltipDefault(pickedInfo) {
        if (!pickedInfo.picked) {
            return null;
        }
        if (pickedInfo.object === lastPickedObject) {
            return lastTooltip;
        }
        const tooltip = {
            html: tabularize(pickedInfo.object),
            style: DEFAULT_STYLE
        };
        lastTooltip = tooltip;
        lastPickedObject = pickedInfo.object;
        return tooltip;
    }