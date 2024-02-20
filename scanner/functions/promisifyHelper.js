function promisifyHelper(resolve, reject){
    return function(err, result){
        if(err){
            return reject(err);
        }else{
            return resolve(result);
        }
    }
}