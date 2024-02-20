function assertEachIsDefined(value, message, stackCrawlMark) {
                        for (const v of value) {
                            assertIsDefined(v, message, stackCrawlMark || assertEachIsDefined);
                        }
                    }