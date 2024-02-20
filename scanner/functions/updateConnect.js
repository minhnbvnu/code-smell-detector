function updateConnect(index) {
                // Skip connects set to false
                if (!scope_Connects[index]) {
                    return;
                }
                var l = 0;
                var h = 100;
                if (index !== 0) {
                    l = scope_Locations[index - 1];
                }
                if (index !== scope_Connects.length - 1) {
                    h = scope_Locations[index];
                }
                // We use two rules:
                // 'translate' to change the left/top offset;
                // 'scale' to change the width of the element;
                // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
                var connectWidth = h - l;
                var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
                var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
                scope_Connects[index].style[options.transformRule] =
                    translateRule + " " + scaleRule;
            }