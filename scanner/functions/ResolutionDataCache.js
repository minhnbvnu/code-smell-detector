function ResolutionDataCache() {
            this.cacheSize = 16;
            this.rdCache = [];
            this.nextUp = 0;
            for(var i = 0; i < this.cacheSize; i++) {
                this.rdCache[i] = {
                    actuals: new Array(),
                    exactCandidates: new Array(),
                    conversionCandidates: new Array(),
                    id: i
                };
            }
        }