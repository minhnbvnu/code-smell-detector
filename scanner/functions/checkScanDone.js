function checkScanDone(lastResult) {
                if (lastResult != null) {
                    resultFn(lastResult);
                };

                if (index === targets.length && messageReceived === targets.length) {
                    const targetSizeBeforeChange = targets.length

                    if (doneRescan === false) {
                        doneRescan = true;
                        timeOut = 3000;

                        for (let target in targetTimeoutErrors) {
                            // if not all scanned ports for a given host timed out 
                            // (e.g. fetch error instead), then we should rescan.
                            // Works if we scan two ports per host (one closed and one open)
                            if (targetTimeoutErrors[target].count < portsArr.length) {
                                targetTimeoutErrors[target].rescanports.forEach(port => {
                                    targets.push([target, port]);
                                })
                            };
                        };

                        if (targetSizeBeforeChange === targets.length) {
                            results.sort(function (a, b) {
                                return (b.duration - a.duration);
                            });
                            completedFn(results);
                            return true;

                        } else {
                            console.log(`Rescanning targets with larger timeout: ${targets.slice(index)}`);
                            return false;

                        }
                    } else {
                        results.sort(function (a, b) {
                            return (b.duration - a.duration);
                        });
                        completedFn(results);
                        return true;
                    }
                } else {
                    return false;

                }
            }