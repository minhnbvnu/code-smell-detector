function updateBuildStatus(build, desiredStatus, statusMessage, username) {
    // UNSTABLE -> SUCCESS needs to update meta and endtime.
    // However, the status itself cannot be updated to SUCCESS
    const currentStatus = build.status;

    if (currentStatus !== 'UNSTABLE') {
        if (desiredStatus !== undefined) {
            build.status = desiredStatus;
        }
        if (build.status === 'ABORTED') {
            if (currentStatus === 'FROZEN') {
                build.statusMessage = `Frozen build aborted by ${username}`;
            } else {
                build.statusMessage = `Aborted by ${username}`;
            }
        } else if (build.status === 'FAILURE' || build.status === 'SUCCESS') {
            if (statusMessage) {
                build.statusMessage = statusMessage;
            }
        } else {
            build.statusMessage = statusMessage || null;
        }
    }
}