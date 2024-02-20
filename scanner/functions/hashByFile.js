function hashByFile(source_map) {
    var sources = source_map.sources;
    var sources_by_file = {};

    for (var i = 0; i < sources.length; i++) {
      sources_by_file[sources[i]] = source_map.sourcesContent[i] && source_map.sourcesContent[i].split('\n')
    }

    return sources_by_file;
}