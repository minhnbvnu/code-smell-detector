function loadArtistPage(page,next){

        var url = baseUrl + "search_artist&query=***";
        url += "&page=" + page;

        var xmlFileName =  "artist_" + page + ".xml";
        var file = fs.createWriteStream("cache/" + xmlFileName);

        https.get(url,function(response){
            response.pipe(file);
            file.on('finish', function() {
                console.log("Done, saved as " + xmlFileName);
                file.close(next);
            });
        }).on('error', function(err) {
            fs.unlink("cache/" + xmlFileName);
            console.log("Error: " + err.message);
        });
    }