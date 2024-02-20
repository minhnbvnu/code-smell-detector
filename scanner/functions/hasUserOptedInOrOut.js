function hasUserOptedInOrOut () {
    const insightOptOut = insight.realOptOut === undefined;
    return !(insightOptOut);
}