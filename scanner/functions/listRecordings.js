function listRecordings(opts) {
    return normalize.pagination(
        client.recordings.list,
        'recordings',
        normalize.recording,
        opts
    );
}