function loadFromApiV1(url,next){
        console.log("load from api " + apiUrl + url);
        FetchService.json(apiUrlV1 + url,function(data){
            if (data && data.modarchive) data = data.modarchive;
            next(data);
        })
    }