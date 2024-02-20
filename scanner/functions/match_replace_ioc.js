function match_replace_ioc(entry, reap) {

    for (rak in reap) {
        entry = entry.replace(reap[rak][0], reap[rak][1]);
    }
    return entry;
}