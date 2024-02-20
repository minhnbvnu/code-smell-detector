function addDaterangeToDump(daterange, dump) {
    for (const site of Object.keys(dump.sites)){
        let siteData = daterange[site]
        let nildata = Object.fromEntries(Object.keys(dump.sites[site].visits.all).map((k)=>[k, {}]))
        if (siteData){
            dump.sites[site].visits.daterange = {...nildata, ...siteData}
        } else {
            dump.sites[site].visits.daterange = nildata
        }
    }
}