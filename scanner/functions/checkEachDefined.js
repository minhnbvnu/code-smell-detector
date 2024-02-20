function checkEachDefined(value, message, stackCrawlMark) {
                        assertEachIsDefined(value, message, stackCrawlMark || checkEachDefined);
                        return value;
                    }