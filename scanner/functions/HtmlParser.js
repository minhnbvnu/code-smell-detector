function HtmlParser (resource) {


    if (resource instanceof Promise) {
        return resource.then(function (resource) {
            return new HtmlParser(resource);
        });
    }


    if (!(resource instanceof Resource.Model)) {
        throw new Error('require `Resource.Model`');
    }


    return new Promise(function (resolve, reject) {
        var file = resource.file;
        var content = resource.content;
        var options = resource.options;
        var $;


        try {
            $ = cheerio.load(content);
        } catch (error) {
            var errors = new VError(error, 'parse "%s" failed', file);
            return reject(errors);
        }


        resolve(new HtmlParser.Parser($, file, options));
    });
    
}