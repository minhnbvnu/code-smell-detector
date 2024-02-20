function createTimer(measureName, startMarkName, endMarkName) {
            let enterCount = 0;
            return {
                enter,
                exit
            };
            function enter() {
                if (++enterCount === 1) {
                    mark(startMarkName);
                }
            }
            function exit() {
                if (--enterCount === 0) {
                    mark(endMarkName);
                    measure(measureName, startMarkName, endMarkName);
                }
                else if (enterCount < 0) {
                    Debug.fail("enter/exit count does not match.");
                }
            }
        }