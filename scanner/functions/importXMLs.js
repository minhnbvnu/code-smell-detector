function importXMLs(format,startPage,endPage,next){
            console.log("importing all " + format);

            var page = startPage;
            var maxPage = endPage;

            var loadNext = function(){
                processModXml(format,page,function(){
                    page++;
                    if (page<=maxPage) {
                        loadNext();
                    }else{
                        next();
                    }
                })
            };

            loadNext();
        }