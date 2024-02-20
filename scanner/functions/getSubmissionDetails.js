function getSubmissionDetails() {
        return Promise.all([
            rocketRewardsPool.getTrustedNodeSubmitted(txOptions.from, index),
            rocketRewardsPool.getSubmissionCount(submission),
        ]).then(
            ([nodeSubmitted, count]) =>
            ({nodeSubmitted, count})
        );
    }