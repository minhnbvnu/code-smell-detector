function getImageProps(props) {
    return _.omit(props, ['source', 'defaultSource', 'fallbackSource', 'LoadingIndicator', 'activityIndicatorProps', 'style', 'useQueryParamsInCacheKey', 'renderImage', 'resolveHeaders']);
}