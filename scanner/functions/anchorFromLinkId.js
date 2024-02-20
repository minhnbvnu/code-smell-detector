function anchorFromLinkId($ctx, linkId) {
        return linkId ? $ctx.find('a[href $= "#' + linkId + '"]') : $();
    }