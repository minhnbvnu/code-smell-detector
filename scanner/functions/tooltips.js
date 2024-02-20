function tooltips() {
                removeTooltips();
                // Tooltips are added with options.tooltips in original order.
                scope_Tooltips = scope_Handles.map(addTooltip);
                bindEvent("update" + INTERNAL_EVENT_NS.tooltips, function (values, handleNumber, unencoded) {
                    if (!scope_Tooltips || !options.tooltips) {
                        return;
                    }
                    if (scope_Tooltips[handleNumber] === false) {
                        return;
                    }
                    var formattedValue = values[handleNumber];
                    if (options.tooltips[handleNumber] !== true) {
                        formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                    }
                    scope_Tooltips[handleNumber].innerHTML = formattedValue;
                });
            }