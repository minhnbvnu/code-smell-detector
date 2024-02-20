function runNext() {
                    if (runCounter < s.urls.length) {
                        url = baseUrl(s.urls[runCounter++]);
                        // avoid repeat visits
                        if (!config.allowRepeatUrls && url in visited) {
                            runNext();
                        } else {
                            // scrape this url
							window.setTimeout(function() {
								s.scrape(url, scrapers, complete);
							},config.delayBetweenRuns);
                        }
                    } else {
                        s.complete();
                    }
                }