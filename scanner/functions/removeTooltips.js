function removeTooltips() {
                if (scope_Tooltips) {
                    removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                    scope_Tooltips.forEach(function (tooltip) {
                        if (tooltip) {
                            removeElement(tooltip);
                        }
                    });
                    scope_Tooltips = null;
                }
            }