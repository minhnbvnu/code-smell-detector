function suggestedAssetFilename(url, suffix) {
    // Remove extension
    url = url.replace(/\..*$/, '');

    // Remove prefix
    url = url.replace(/^.*\//, '');

    // Spaces (!) and punctuation to underscores
    url = url.replace(/[+\- ,\(\)\[\]\$]/g, '_');

    // Remove dimension specifications
    url = url.replace(/_\d+x\d+/g, '');

    // Remove leading underscore or number
    url = url.replace(/^[0-9_]+/, '');

    // Remove 'kenny_', 'dawnlike_', or 'dawnbringer_'
    url = url.replace(/^(kenney|dawnbringer|dawnlike)_/, '');

    return url + (suffix || '');
}