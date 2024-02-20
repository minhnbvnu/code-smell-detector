function calculateStatsPerRun(results) {
        return results.reduce((stat, result) => {
            stat.errorCount += result.errorCount;
            stat.fatalErrorCount += result.fatalErrorCount;
            stat.warningCount += result.warningCount;
            stat.fixableErrorCount += result.fixableErrorCount;
            stat.fixableWarningCount += result.fixableWarningCount;
            return stat;
        }, {
            errorCount: 0,
            fatalErrorCount: 0,
            warningCount: 0,
            fixableErrorCount: 0,
            fixableWarningCount: 0
        });
    }