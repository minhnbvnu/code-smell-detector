function Sample(sampleRate) {
                    this.INT_MAX_VALUE = 2147483647;
                    if (sampleRate > 100 || sampleRate < 0) {
                        ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "Sampling rate is out of range (0..100): '" + sampleRate + "'. Sampling will be disabled, you may be sending too much data which may affect your AI service level.");
                        this.sampleRate = 100;
                    }
                    this.sampleRate = sampleRate;
                }