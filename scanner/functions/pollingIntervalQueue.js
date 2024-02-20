function pollingIntervalQueue(pollingInterval) {
                switch (pollingInterval) {
                    case 250 /* Low */:
                        return lowPollingIntervalQueue;
                    case 500 /* Medium */:
                        return mediumPollingIntervalQueue;
                    case 2e3 /* High */:
                        return highPollingIntervalQueue;
                }
            }