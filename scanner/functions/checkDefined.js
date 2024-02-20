function checkDefined(value, message, stackCrawlMark) {
                        assertIsDefined(value, message, stackCrawlMark || checkDefined);
                        return value;
                    }