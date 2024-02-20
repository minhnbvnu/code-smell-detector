function readPage(path, callback){
  if(cache[path]) {
    callback(cache[path]);
  } else {
    cache[path] = [];
    
    fs.createReadStream( Path.normalize(Path.join(__dirname, path)), {
      'flags': 'r',
      'encoding': 'binary',
      'mode': 0666,
      'bufferSize': 4 * 1024
    }).addListener("data", function(chunk){
      cache[path].push(chunk);
    }).on("end", function(){
      callback(cache[path]);
    });
  }
}