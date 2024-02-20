function updateVersionTags(repoAndTagList) {
    return repoAndTagList.reduce((prev, repoAndTag) => {
        let tag = repoAndTag.tag;
        // Get the version number section of the tag if it exists
        const firstDash = tag.indexOf('-');
        if (firstDash > 0) {
            const versionSection = tag.substring(0, firstDash - 1);
            // See if there are three digits in the version number
            const versionParts = versionSection.split('.');
            if (versionParts.length === 3) {
                // If there are, update the break fix version
                tag = `${versionParts[0]}.${versionParts[1]}.${versionParts[2] + 1}${tag.substring(firstDash)}`;
            }
        }
        return prev.push({
            name: repoAndTag.repository,
            tag: tag
        });
    }, []);
}