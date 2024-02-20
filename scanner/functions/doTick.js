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