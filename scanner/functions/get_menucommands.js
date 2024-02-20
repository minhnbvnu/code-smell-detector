function get_menucommands(cb) {
    chrome.runtime.sendMessage({
        type: "get_menucommands",
    }, function(response) {
        cb(response.data);
    });
}