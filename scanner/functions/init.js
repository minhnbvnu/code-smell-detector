function init() {
            self.debug('queuing');

            browser.init(init_conf, function(err) {
                if (err) {
                    if (err.data) {
                        err.message += ': ' + err.data.split('\n').slice(0, 1);
                    }
                    return self.shutdown(err);
                }

                var reporter = new EventEmitter();

                reporter.on('test_end', function(test) {
                    if (!test.passed) {
                        return self.stats.failed++;
                    }
                    self.stats.passed++;
                });

                reporter.on('done', function(results) {
                    clearTimeout(self.noOutputTimeout);
                    self.debug('done');
                    var passed = results.passed;
                    var called = false;
                    browser.sauceJobStatus(passed, function(err) {
                        if (called) {
                            return;
                        }

                        called = true;
                        self.shutdown();

                        if (err) {
                            return;
                            // don't let this error fail us
                        }
                    });

                    reporter.removeAllListeners();
                });

                self.debug('open %s', url);
                self.emit('start', reporter);

                var timeout = false;
                var get_timeout = setTimeout(function() {
                    self.debug('timed out waiting for open %s', url);
                    timeout = true;
                    self.shutdown(new Error('Timeout opening url after ' + Math.round(self._opt.browser_open_timeout/1000) + 's'));
                }, self._opt.browser_open_timeout);

                browser.get(url, function(err) {
                    self.debug('browser opened url');

                    if (timeout) {
                        return;
                    }

                    clearTimeout(get_timeout);
                    if (err) {
                        return self.shutdown(err);
                    }

                    // no new output for 30s => error
                    watchOutput();

                    function watchOutput() {
                        if (self._opt.browser_output_timeout === -1) {
                            return;
                        }

                        clearTimeout(self.noOutputTimeout);

                        self.noOutputTimeout = setTimeout(function() {
                            self.shutdown(new Error('Did not receive any new output from browser for ' + Math.round(self._opt.browser_output_timeout/1000) + 's, shutting down'));
                        }, self._opt.browser_output_timeout);
                    }

                    (function wait() {
                        if (self.stopped) {
                            return;
                        }

                        self.debug('waiting for test results from %s', url);
                        // take the last 1000 log lines
                        // careful, the less you log lines, the slower your test
                        // result will be. The test could be finished in the browser
                        // but not in your console since it can take a lot
                        // of time to get a lot of results
                        var js = '(window.zuul_msg_bus ? window.zuul_msg_bus.splice(0, 1000) : []);'
                        browser.eval(js, function(err, res) {
                            if (err) {
                                self.debug('err: %s', err.message);
                                return self.shutdown(err);
                            }

                            res = res || [];
                            //When testing with microsoft edge:
                            //Adds length property to array-like object if not defined to execute filter properly
                            if (res.length === undefined) {
                                res.length = Object.keys(res).length;
                            }
                            self.debug('res.length: %s', res.length);

                            // if we received some data, reset the no output watch timeout
                            if (res.length > 0) {
                                watchOutput();
                            }

                            var has_done = false;
                            Array.prototype.filter.call(res, Boolean).forEach(function(msg) {
                                if (msg.type === 'done') {
                                    has_done = true;
                                }

                                reporter.emit(msg.type, msg);
                            });

                            if (has_done) {
                                self.debug('finished tests for %s', url);
                                return;
                            }

                            self.debug('fetching more results');

                            // if we found results, let's not wait
                            // to get more
                            if (res.length > 0) {
                                process.nextTick(wait);
                            } else {
                                // otherwise, let's wait a little so that we do not
                                // spam saucelabs
                                setTimeout(wait, 2000);
                            }
                        });
                    })();
                });
            });
        }