function determineStartFrom(action, type, targetBranch, pipelineBranch, releaseName, tagName, isReleaseOrTagFiltering) {
    let startFrom;

    if (type && type === 'pr') {
        startFrom = '~pr';
    } else {
        switch (action) {
            case 'release':
                return releaseName && isReleaseOrTagFiltering ? `~release:${releaseName}` : '~release';
            case 'tag':
                if (!tagName) {
                    logger.error('The ref of SCM Webhook is missing.');

                    return '';
                }

                return isReleaseOrTagFiltering ? `~tag:${tagName}` : '~tag';
            default:
                startFrom = '~commit';
                break;
        }
    }

    return targetBranch !== pipelineBranch ? `${startFrom}:${targetBranch}` : startFrom;
}