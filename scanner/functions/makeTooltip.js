function makeTooltip(tooltips, layers) {
        /*
         * If explicitly no tooltip passed by user, return null
         * If a JSON object passed, return a tooltip based on that object
         *   We expect the user has passed a string template that will take pickedInfo keywords
         * If a boolean passed, return the default tooltip
         */
        if (!tooltips) {
            return null;
        }
        let per_layer = false;
        const layer_tooltips = {};
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const layer_id = layer.id;
            if (typeof tooltips !== "boolean" && (i.toString() in tooltips || layer_id in tooltips)) {
                layer_tooltips[layer_id] = layer_id in tooltips ? tooltips[layer_id] : tooltips[i.toString()];
                per_layer = true;
            }
        }
        if (tooltips.html || tooltips.text || per_layer) {
            return (pickedInfo) => {
                if (!pickedInfo.picked) {
                    return null;
                }
                const tooltip = (per_layer) ? layer_tooltips[pickedInfo.layer.id] : tooltips;
                if (tooltip == null)
                    return;
                else if (typeof tooltip === "boolean")
                    return tooltip ? getTooltipDefault(pickedInfo) : null;
                const formattedTooltip = {
                    style: tooltip.style || DEFAULT_STYLE
                };
                if (tooltip.html) {
                    formattedTooltip.html = substituteIn(tooltip.html, pickedInfo.object);
                }
                else {
                    formattedTooltip.text = substituteIn(tooltip.text, pickedInfo.object);
                }
                return formattedTooltip;
            };
        }
        return getTooltipDefault;
    }