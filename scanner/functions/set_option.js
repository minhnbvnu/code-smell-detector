function set_option(name, value) {
    var kv = {};
    kv[name] = JSON.stringify(value);

    chrome.runtime.sendMessage({
        type: "setvalue",
        data: kv
    });
}