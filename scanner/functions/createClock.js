function createClock(start, loopLimit) {
        // eslint-disable-next-line no-param-reassign
        start = Math.floor(getEpoch(start));
        // eslint-disable-next-line no-param-reassign
        loopLimit = loopLimit || 1000;
        var nanos = 0;
        var adjustedSystemTime = [0, 0]; // [millis, nanoremainder]

        if (NativeDate === undefined) {
            throw new Error(
                "The global scope doesn't have a `Date` object" +
                    " (see https://github.com/sinonjs/sinon/issues/1852#issuecomment-419622780)"
            );
        }

        var clock = {
            now: start,
            timeouts: {},
            Date: createDate(),
            loopLimit: loopLimit
        };

        clock.Date.clock = clock;

        function getTimeToNextFrame() {
            return 16 - ((clock.now - start) % 16);
        }

        function hrtime(prev) {
            var millisSinceStart = clock.now - adjustedSystemTime[0] - start;
            var secsSinceStart = Math.floor(millisSinceStart / 1000);
            var remainderInNanos =
                (millisSinceStart - secsSinceStart * 1e3) * 1e6 +
                nanos -
                adjustedSystemTime[1];

            if (Array.isArray(prev)) {
                if (prev[1] > 1e9) {
                    throw new TypeError(
                        "Number of nanoseconds can't exceed a billion"
                    );
                }

                var oldSecs = prev[0];
                var nanoDiff = remainderInNanos - prev[1];
                var secDiff = secsSinceStart - oldSecs;

                if (nanoDiff < 0) {
                    nanoDiff += 1e9;
                    secDiff -= 1;
                }

                return [secDiff, nanoDiff];
            }
            return [secsSinceStart, remainderInNanos];
        }

        if (hrtimeBigintPresent) {
            hrtime.bigint = function() {
                var parts = hrtime();
                return BigInt(parts[0]) * BigInt(1e9) + BigInt(parts[1]); // eslint-disable-line
            };
        }

        clock.requestIdleCallback = function requestIdleCallback(
            func,
            timeout
        ) {
            var timeToNextIdlePeriod = 0;

            if (clock.countTimers() > 0) {
                timeToNextIdlePeriod = 50; // const for now
            }

            var result = addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay:
                    typeof timeout === "undefined"
                        ? timeToNextIdlePeriod
                        : Math.min(timeout, timeToNextIdlePeriod)
            });

            return result.id || result;
        };

        clock.cancelIdleCallback = function cancelIdleCallback(timerId) {
            return clearTimer(clock, timerId, "Timeout");
        };

        clock.setTimeout = function setTimeout(func, timeout) {
            return addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay: timeout
            });
        };
        if (typeof _global.Promise !== "undefined" && utilPromisify) {
            clock.setTimeout[
                utilPromisify.custom
            ] = function promisifiedSetTimeout(timeout, arg) {
                return new _global.Promise(function setTimeoutExecutor(
                    resolve
                ) {
                    addTimer(clock, {
                        func: resolve,
                        args: [arg],
                        delay: timeout
                    });
                });
            };
        }

        clock.clearTimeout = function clearTimeout(timerId) {
            return clearTimer(clock, timerId, "Timeout");
        };

        clock.nextTick = function nextTick(func) {
            return enqueueJob(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        clock.queueMicrotask = function queueMicrotask(func) {
            return clock.nextTick(func); // explicitly drop additional arguments
        };

        clock.setInterval = function setInterval(func, timeout) {
            // eslint-disable-next-line no-param-reassign
            timeout = parseInt(timeout, 10);
            return addTimer(clock, {
                func: func,
                args: Array.prototype.slice.call(arguments, 2),
                delay: timeout,
                interval: timeout
            });
        };

        clock.clearInterval = function clearInterval(timerId) {
            return clearTimer(clock, timerId, "Interval");
        };

        if (setImmediatePresent) {
            clock.setImmediate = function setImmediate(func) {
                return addTimer(clock, {
                    func: func,
                    args: Array.prototype.slice.call(arguments, 1),
                    immediate: true
                });
            };

            if (typeof _global.Promise !== "undefined" && utilPromisify) {
                clock.setImmediate[
                    utilPromisify.custom
                ] = function promisifiedSetImmediate(arg) {
                    return new _global.Promise(function setImmediateExecutor(
                        resolve
                    ) {
                        addTimer(clock, {
                            func: resolve,
                            args: [arg],
                            immediate: true
                        });
                    });
                };
            }

            clock.clearImmediate = function clearImmediate(timerId) {
                return clearTimer(clock, timerId, "Immediate");
            };
        }

        clock.countTimers = function countTimers() {
            return (
                Object.keys(clock.timers || {}).length +
                (clock.jobs || []).length
            );
        };

        clock.requestAnimationFrame = function requestAnimationFrame(func) {
            var result = addTimer(clock, {
                func: func,
                delay: getTimeToNextFrame(),
                args: [clock.now + getTimeToNextFrame()],
                animation: true
            });

            return result.id || result;
        };

        clock.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
            return clearTimer(clock, timerId, "AnimationFrame");
        };

        clock.runMicrotasks = function runMicrotasks() {
            runJobs(clock);
        };

        function doTick(tickValue, isAsync, resolve, reject) {
            var msFloat =
                typeof tickValue === "number"
                    ? tickValue
                    : parseTime(tickValue);
            var ms = Math.floor(msFloat);
            var remainder = nanoRemainder(msFloat);
            var nanosTotal = nanos + remainder;
            var tickTo = clock.now + ms;

            if (msFloat < 0) {
                throw new TypeError("Negative ticks are not supported");
            }

            // adjust for positive overflow
            if (nanosTotal >= 1e6) {
                tickTo += 1;
                nanosTotal -= 1e6;
            }

            nanos = nanosTotal;
            var tickFrom = clock.now;
            var previous = clock.now;
            var timer,
                firstException,
                oldNow,
                nextPromiseTick,
                compensationCheck,
                postTimerCall;

            clock.duringTick = true;

            // perform microtasks
            oldNow = clock.now;
            runJobs(clock);
            if (oldNow !== clock.now) {
                // compensate for any setSystemTime() call during microtask callback
                tickFrom += clock.now - oldNow;
                tickTo += clock.now - oldNow;
            }

            function doTickInner() {
                // perform each timer in the requested range
                timer = firstTimerInRange(clock, tickFrom, tickTo);
                // eslint-disable-next-line no-unmodified-loop-condition
                while (timer && tickFrom <= tickTo) {
                    if (clock.timers[timer.id]) {
                        tickFrom = timer.callAt;
                        clock.now = timer.callAt;
                        oldNow = clock.now;
                        try {
                            runJobs(clock);
                            callTimer(clock, timer);
                        } catch (e) {
                            firstException = firstException || e;
                        }

                        if (isAsync) {
                            // finish up after native setImmediate callback to allow
                            // all native es6 promises to process their callbacks after
                            // each timer fires.
                            originalSetTimeout(nextPromiseTick);
                            return;
                        }

                        compensationCheck();
                    }

                    postTimerCall();
                }

                // perform process.nextTick()s again
                oldNow = clock.now;
                runJobs(clock);
                if (oldNow !== clock.now) {
                    // compensate for any setSystemTime() call during process.nextTick() callback
                    tickFrom += clock.now - oldNow;
                    tickTo += clock.now - oldNow;
                }
                clock.duringTick = false;

                // corner case: during runJobs new timers were scheduled which could be in the range [clock.now, tickTo]
                timer = firstTimerInRange(clock, tickFrom, tickTo);
                if (timer) {
                    try {
                        clock.tick(tickTo - clock.now); // do it all again - for the remainder of the requested range
                    } catch (e) {
                        firstException = firstException || e;
                    }
                } else {
                    // no timers remaining in the requested range: move the clock all the way to the end
                    clock.now = tickTo;

                    // update nanos
                    nanos = nanosTotal;
                }
                if (firstException) {
                    throw firstException;
                }

                if (isAsync) {
                    resolve(clock.now);
                } else {
                    return clock.now;
                }
            }

            nextPromiseTick =
                isAsync &&
                function() {
                    try {
                        compensationCheck();
                        postTimerCall();
                        doTickInner();
                    } catch (e) {
                        reject(e);
                    }
                };

            compensationCheck = function() {
                // compensate for any setSystemTime() call during timer callback
                if (oldNow !== clock.now) {
                    tickFrom += clock.now - oldNow;
                    tickTo += clock.now - oldNow;
                    previous += clock.now - oldNow;
                }
            };

            postTimerCall = function() {
                timer = firstTimerInRange(clock, previous, tickTo);
                previous = tickFrom;
            };

            return doTickInner();
        }

        /**
         * @param {tickValue} {String|Number} number of milliseconds or a human-readable value like "01:11:15"
         */
        clock.tick = function tick(tickValue) {
            return doTick(tickValue, false);
        };

        if (typeof _global.Promise !== "undefined") {
            clock.tickAsync = function tickAsync(ms) {
                return new _global.Promise(function(resolve, reject) {
                    originalSetTimeout(function() {
                        try {
                            doTick(ms, true, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.next = function next() {
            runJobs(clock);
            var timer = firstTimer(clock);
            if (!timer) {
                return clock.now;
            }

            clock.duringTick = true;
            try {
                clock.now = timer.callAt;
                callTimer(clock, timer);
                runJobs(clock);
                return clock.now;
            } finally {
                clock.duringTick = false;
            }
        };

        if (typeof _global.Promise !== "undefined") {
            clock.nextAsync = function nextAsync() {
                return new _global.Promise(function(resolve, reject) {
                    originalSetTimeout(function() {
                        try {
                            var timer = firstTimer(clock);
                            if (!timer) {
                                resolve(clock.now);
                                return;
                            }

                            var err;
                            clock.duringTick = true;
                            clock.now = timer.callAt;
                            try {
                                callTimer(clock, timer);
                            } catch (e) {
                                err = e;
                            }
                            clock.duringTick = false;

                            originalSetTimeout(function() {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(clock.now);
                                }
                            });
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.runAll = function runAll() {
            var numTimers, i;
            runJobs(clock);
            for (i = 0; i < clock.loopLimit; i++) {
                if (!clock.timers) {
                    return clock.now;
                }

                numTimers = keys(clock.timers).length;
                if (numTimers === 0) {
                    return clock.now;
                }

                clock.next();
            }

            throw new Error(
                "Aborting after running " +
                    clock.loopLimit +
                    " timers, assuming an infinite loop!"
            );
        };

        clock.runToFrame = function runToFrame() {
            return clock.tick(getTimeToNextFrame());
        };

        if (typeof _global.Promise !== "undefined") {
            clock.runAllAsync = function runAllAsync() {
                return new _global.Promise(function(resolve, reject) {
                    var i = 0;
                    function doRun() {
                        originalSetTimeout(function() {
                            try {
                                var numTimers;
                                if (i < clock.loopLimit) {
                                    if (!clock.timers) {
                                        resolve(clock.now);
                                        return;
                                    }

                                    numTimers = Object.keys(clock.timers)
                                        .length;
                                    if (numTimers === 0) {
                                        resolve(clock.now);
                                        return;
                                    }

                                    clock.next();

                                    i++;

                                    doRun();
                                    return;
                                }

                                reject(
                                    new Error(
                                        "Aborting after running " +
                                            clock.loopLimit +
                                            " timers, assuming an infinite loop!"
                                    )
                                );
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }
                    doRun();
                });
            };
        }

        clock.runToLast = function runToLast() {
            var timer = lastTimer(clock);
            if (!timer) {
                runJobs(clock);
                return clock.now;
            }

            return clock.tick(timer.callAt - clock.now);
        };

        if (typeof _global.Promise !== "undefined") {
            clock.runToLastAsync = function runToLastAsync() {
                return new _global.Promise(function(resolve, reject) {
                    originalSetTimeout(function() {
                        try {
                            var timer = lastTimer(clock);
                            if (!timer) {
                                resolve(clock.now);
                            }

                            resolve(clock.tickAsync(timer.callAt));
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            };
        }

        clock.reset = function reset() {
            nanos = 0;
            clock.timers = {};
            clock.jobs = [];
            clock.now = start;
        };

        clock.setSystemTime = function setSystemTime(systemTime) {
            // determine time difference
            var newNow = getEpoch(systemTime);
            var difference = newNow - clock.now;
            var id, timer;

            adjustedSystemTime[0] = adjustedSystemTime[0] + difference;
            adjustedSystemTime[1] = adjustedSystemTime[1] + nanos;
            // update 'system clock'
            clock.now = newNow;
            nanos = 0;

            // update timers and intervals to keep them stable
            for (id in clock.timers) {
                if (clock.timers.hasOwnProperty(id)) {
                    timer = clock.timers[id];
                    timer.createdAt += difference;
                    timer.callAt += difference;
                }
            }
        };

        if (performancePresent) {
            clock.performance = Object.create(null);

            if (hasPerformancePrototype) {
                var proto = _global.Performance.prototype;

                Object.getOwnPropertyNames(proto).forEach(function(name) {
                    if (name.indexOf("getEntries") === 0) {
                        // match expected return type for getEntries functions
                        clock.performance[name] = NOOP_ARRAY;
                    } else {
                        clock.performance[name] = NOOP;
                    }
                });
            }

            clock.performance.now = function FakeTimersNow() {
                var hrt = hrtime();
                var millis = hrt[0] * 1000 + hrt[1] / 1e6;
                return millis;
            };
        }

        if (hrtimePresent) {
            clock.hrtime = hrtime;
        }

        return clock;
    }