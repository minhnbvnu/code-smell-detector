function cacheRequire(name){
    var module;
    try{
        module = require(name);
    }
    catch(e){
        try {
            module = require(process.cwd() + '/node_modules/' + name)
        }
        catch(ex){
            throw e;
        }
    }
    return module;
}