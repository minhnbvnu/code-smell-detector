function objectToQuery(/*Object*/ map){
        // summary:
        //		takes a name/value mapping object and returns a string representing
        //		a URL-encoded version of that object.
        // example:
        //		this object:
        //
        //	|	{
        //	|		blah: "blah",
        //	|		multi: [
        //	|			"thud",
        //	|			"thonk"
        //	|		]
        //	|	};
        //
        // yields the following query string:
        //
        //	|	"blah=blah&multi=thud&multi=thonk"

        // FIXME: need to implement encodeAscii!!
        var enc = encodeURIComponent, pairs = [];
        for(var name in map){
            var value = map[name];
            if(value != backstop[name]){
                var assign = enc(name) + "=";
                if(lang.isArray(value)){
                    for(var i = 0, l = value.length; i < l; ++i){
                        pairs.push(assign + enc(value[i]));
                    }
                }else{
                    pairs.push(assign + enc(value));
                }
            }
        }
        return pairs.join("&"); // String
    }