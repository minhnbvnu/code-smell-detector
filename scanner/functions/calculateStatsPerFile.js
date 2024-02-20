function calculateStatsPerFile(messages) {
        return messages.reduce((stat, message) => {
            if (message.fatal || message.severity === 2) {
                stat.errorCount++;
                if (message.fatal) {
                    stat.fatalErrorCount++;
                }
                if (message.fix) {
                    stat.fixableErrorCount++;
                }
            }
            else {
                stat.warningCount++;
                if (message.fix) {
                    stat.fixableWarningCount++;
                }
            }
            return stat;
        }, {
            errorCount: 0,
            fatalErrorCount: 0,
            warningCount: 0,
            fixableErrorCount: 0,
            fixableWarningCount: 0
        });
    }