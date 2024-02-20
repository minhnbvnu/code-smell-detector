function assertIsDefined(value, message, stackCrawlMark) {
                        if (value === void 0 || value === null) {
                            fail(message, stackCrawlMark || assertIsDefined);
                        }
                    }