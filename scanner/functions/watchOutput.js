function watchOutput() {
                        if (self._opt.browser_output_timeout === -1) {
                            return;
                        }

                        clearTimeout(self.noOutputTimeout);

                        self.noOutputTimeout = setTimeout(function() {
                            self.shutdown(new Error('Did not receive any new output from browser for ' + Math.round(self._opt.browser_output_timeout/1000) + 's, shutting down'));
                        }, self._opt.browser_output_timeout);
                    }