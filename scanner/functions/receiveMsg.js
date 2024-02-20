function receiveMsg(info){
    var msg = ab2str(info.data);
    chrome.runtime.sendMessage({action:'receive', msg:msg});
}