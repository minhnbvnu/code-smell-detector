function fetchSourceData(source, extent) {
    const url = source.urlFromExtent(extent);

    return source.fetcher(url, source.networkOptions).then((f) => {
        f.extent = extent;
        return f;
    }, err => source.handlingError(err));
}