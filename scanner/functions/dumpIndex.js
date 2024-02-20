function dumpIndex()
{
    console.log("var refs = {");

    var keys = [];

    for (var href in refs)
    {
        keys.push(href);
    }
    
    keys.sort();

    for (var i in keys)
    {
        var comma = (i < keys.length - 1 ? "," : "");
        console.log("\""+keys[i]+"\": "+refs[keys[i]]+comma);
    }

    console.log("};");
}