function createMeta(parsed) {
    const { action, ref, releaseId, releaseName, releaseAuthor } = parsed;

    if (action === 'release') {
        return {
            sd: {
                release: {
                    id: releaseId,
                    name: releaseName,
                    author: releaseAuthor
                },
                tag: {
                    name: ref
                }
            }
        };
    }
    if (action === 'tag') {
        return {
            sd: {
                tag: {
                    name: ref
                }
            }
        };
    }

    return {};
}