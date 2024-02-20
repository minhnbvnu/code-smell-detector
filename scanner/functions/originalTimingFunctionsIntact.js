function originalTimingFunctionsIntact() {
            return global.setTimeout === realTimingFunctions.setTimeout
        && global.clearTimeout === realTimingFunctions.clearTimeout
        && global.setInterval === realTimingFunctions.setInterval
        && global.clearInterval === realTimingFunctions.clearInterval;
        }