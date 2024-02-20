function addTooltip(handle, handleNumber) {
                if (!options.tooltips || !options.tooltips[handleNumber]) {
                    return false;
                }
                return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
            }