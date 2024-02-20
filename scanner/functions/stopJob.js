function stopJob({ job, prNum, action }) {
    const stopRunningBuild = build => {
        if (build.isDone()) {
            return Promise.resolve();
        }

        const statusMessage =
            action === 'Closed'
                ? `Aborted because PR#${prNum} was closed`
                : `Aborted because new commit was pushed to PR#${prNum}`;

        build.status = 'ABORTED';
        build.statusMessage = statusMessage;

        return build.update();
    };

    return (
        job
            .getRunningBuilds()
            // Stop running builds
            .then(builds => Promise.all(builds.map(stopRunningBuild)))
    );
}