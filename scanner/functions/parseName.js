function parseName(name){
        var match = rParts.exec(name),
            data = {
                moduleName : match[1],
                version : match[2] || '1'
            };
        data.settings = propertyParser.parseProperties(match[3]);
        return data;
    }