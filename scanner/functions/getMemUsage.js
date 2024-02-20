function getMemUsage(callback){
    chrome.system.memory.getInfo(function(info){
        callback(info);
    });
}