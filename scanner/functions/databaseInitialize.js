function databaseInitialize() {
        modules = db.getCollection("modules");
        if (modules === null) modules = db.addCollection("modules");

        var artistsList = db.getCollection("artists");
        if (artistsList != null){
            var all = artistsList.find();
            all.forEach(function(a){
                artists.push({id: a.id, handle: a.handle, count: a.modCount});
            });
        }

        // get genres
        var genreCount = {};
        all = modules.find();
        all.forEach(function(mod){
            var count = genreCount[mod.genre] || 0;
            //console.log(mod.genre +  " - " + count);
            if (count == 0) genres.push({name: mod.genre});
            genreCount[mod.genre] = count+1;
        });
        genres.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        for (var i = genres.length-1;i>=0;i--){
            genres[i].count = genreCount[genres[i].name] || 0;
        }

    }