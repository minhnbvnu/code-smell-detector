function simpleForwardCall(logger, actionDescription2, action, logPerformance) {
            let start;
            if (logPerformance) {
                logger.log(actionDescription2);
                start = timestamp();
            }
            const result = action();
            if (logPerformance) {
                const end = timestamp();
                logger.log(`${actionDescription2} completed in ${end - start} msec`);
                if (isString(result)) {
                    let str = result;
                    if (str.length > 128) {
                        str = str.substring(0, 128) + "...";
                    }
                    logger.log(`  result.length=${str.length}, result='${JSON.stringify(str)}'`);
                }
            }
            return result;
        }