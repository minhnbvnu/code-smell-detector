function hijackMethod(target, method, clock) {
        var prop;
        clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(
            target,
            method
        );
        clock["_" + method] = target[method];

        if (method === "Date") {
            var date = mirrorDateProperties(clock[method], target[method]);
            target[method] = date;
        } else if (method === "performance") {
            var originalPerfDescriptor = Object.getOwnPropertyDescriptor(
                target,
                method
            );
            // JSDOM has a read only performance field so we have to save/copy it differently
            if (
                originalPerfDescriptor &&
                originalPerfDescriptor.get &&
                !originalPerfDescriptor.set
            ) {
                Object.defineProperty(
                    clock,
                    "_" + method,
                    originalPerfDescriptor
                );

                var perfDescriptor = Object.getOwnPropertyDescriptor(
                    clock,
                    method
                );
                Object.defineProperty(target, method, perfDescriptor);
            } else {
                target[method] = clock[method];
            }
        } else {
            target[method] = function() {
                return clock[method].apply(clock, arguments);
            };

            for (prop in clock[method]) {
                if (clock[method].hasOwnProperty(prop)) {
                    target[method][prop] = clock[method][prop];
                }
            }
        }

        target[method].clock = clock;
    }