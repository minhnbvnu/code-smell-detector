function getTagsForVersion(definitionId, version, registry, registryPath, variant) {
    if (typeof config.definitionBuildSettings[definitionId] === 'undefined') {
        return null;
    }

    // If the image states that only versioned tags are returned and the version is 'dev', 
    // add the image name to ensure that we do not incorrectly hijack a tag from another image.
    if (version === 'dev') {
        version = config.definitionBuildSettings[definitionId].versionedTagsOnly ? `dev-${definitionId.replace(/-/mg,'')}` : 'dev';
    }


    // Use the first variant if none passed in, unless there isn't one
    if (!variant) {
        const variants = getVariants(definitionId);
        variant = variants ? variants[0] : 'NOVARIANT';
    }
    let tags = config.definitionBuildSettings[definitionId].tags;

    // See if there are any variant specific tags that should be added to the output
    const variantTags = config.definitionBuildSettings[definitionId].variantTags;
    // ${VARIANT} or $VARIANT may be passed in as a way to do lookups. Add all in this case.
    if (['${VARIANT}', '$VARIANT'].indexOf(variant) > -1) {
        if (variantTags) {
            for (let variantEntry in variantTags) {
                tags = tags.concat(variantTags[variantEntry] || []);
            }
        }
    } else {
        if (variantTags) {
            tags = tags.concat(variantTags[variant] || []);
        }
    }

    return tags.reduce((list, tag) => {
        // One of the tags that needs to be supported is one where there is no version, but there
        // are other attributes. For example, python:3 in addition to python:0.35.0-3. So, a version
        // of '' is allowed. However, there are also instances that are just the version, so in 
        // these cases latest would be used instead. However, latest is passed in separately.
        let baseTag = tag.replace('${VERSION}', version)
            .replace(':-', ':')
            .replace(/\$\{?VARIANT\}?/, variant || 'NOVARIANT')
            .replace('-NOVARIANT', '');
        if (baseTag.charAt(baseTag.length - 1) !== ':') {
            list.push(`${registry}/${registryPath}/${baseTag}`);
        }
        return list;
    }, []);
}