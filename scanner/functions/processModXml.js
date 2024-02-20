function processModXml(format,page,next){

            var xmlFileName =  format + "_" + page + ".xml";
            console.log("Processing " + xmlFileName);

            var fileData = fs.readFileSync("cache/" + xmlFileName, 'utf8');
            //fileData = fileData.replace(new RegExp('&', 'g'),'');
            var parser = new xml2js.Parser({explicitArray: false});

            parser.parseString(fileData, function (err, result) {
                if (result && result.modarchive){
                    var list = result.modarchive.module;

                    var count = 0;

                    list.forEach(function(item,index){

                        var genre = parseInt(item.genreid,10);
                        var artist = item.artist_info.artist || {};
                        var artistId = artist.id || 0;
                        var artistName = artist.alias || "";
                        artistId = parseInt(artistId,10);
                        var rating = parseFloat(item.overall_ratings.comment_rating);
                        var score = parseFloat(item.overall_ratings.review_rating);

                        if(genre || artistId || score || rating){
                            count++;
                            modules.insert({
                                id: item.id,
                                title: item.songtitle,
                                author: artistId,
                                artist: artistName,
                                genre: genre,
                                rate: rating,
                                score: score,
                                format: item.format.toLowerCase(),
                                size: parseInt(item.bytes,10)
                            });
                        }

                    });

                    console.log("accepted " + count + " mods");

                    next();
                }else{
                    console.log("Error: " + xmlFileName + " does not seem to ba a valid modArchive XML");
                    console.log(result);
                }



            });
        }