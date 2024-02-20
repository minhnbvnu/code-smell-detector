function handleContextLoss(event) {
                event.preventDefault();
                // set context lost flag
                contextLost = true;
                // pause request animation frame
                stopRAF();
                // lose context
                lossCallbacks.forEach(function (cb) {
                    cb();
                });
            }