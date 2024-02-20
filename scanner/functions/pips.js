function pips(pips) {
                // Fix #669
                removePips();
                var spread = generateSpread(pips);
                var filter = pips.filter;
                var format = pips.format || {
                    to: function (value) {
                        return String(Math.round(value));
                    },
                };
                scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
                return scope_Pips;
            }