function lookupSeries(dependencies, done){
        var pending = dependencies.length,
            failed = false;

        if(pending === 0){ // sanity
            return done();
        }

        for(var i = 0; i < pending; i++){
            lookup(dependencies[i], loaded);
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