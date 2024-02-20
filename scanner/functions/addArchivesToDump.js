function addArchivesToDump(archives, dump) {
    for (const site of Object.keys(dump.sites)) {

        dump.sites[site].visits.last7 =  patchArchiveVisit(mergeVisits([
            dump.sites[site].visits.day,
            dump.sites[site].visits.yesterday,
            archives["-7:-2"][site] || {},
        ]));

        dump.sites[site].visits.last30 = patchArchiveVisit(mergeVisits([
            dump.sites[site].visits.day,
            dump.sites[site].visits.yesterday,
            archives["-30:-2"][site] || {},
        ]));

    }
    return dump
}