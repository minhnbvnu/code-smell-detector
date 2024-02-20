function eventHover(event) {
                var proposal = calcPointToPercentage(event.calcPoint);
                var to = scope_Spectrum.getStep(proposal);
                var value = scope_Spectrum.fromStepping(to);
                Object.keys(scope_Events).forEach(function (targetEvent) {
                    if ("hover" === targetEvent.split(".")[0]) {
                        scope_Events[targetEvent].forEach(function (callback) {
                            callback.call(scope_Self, value);
                        });
                    }
                });
            }