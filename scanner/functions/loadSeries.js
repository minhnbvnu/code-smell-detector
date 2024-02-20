function loadSeries(links, done){
        var series = links.split(settings.separator),
            pending = series.length,
            failed = false;

        if(pending === 0){ // sanity
            return done();
        }

        for(var i = 0; i < pending; i++){
            load(series[i], loaded);
        }

        function loaded(err){
            if(err){
                failed = true;
                return done(err);
            }
            if(--pending === 0 && !failed){
                done(null);
            }
        }
    }