function sortZoneScores (a, b) {
        if (a.offsetScore !== b.offsetScore) {
            return a.offsetScore - b.offsetScore;
        }
        if (a.abbrScore !== b.abbrScore) {
            return a.abbrScore - b.abbrScore;
        }
        if (a.zone.population !== b.zone.population) {
            return b.zone.population - a.zone.population;
        }
        return b.zone.name.localeCompare(a.zone.name);
    }