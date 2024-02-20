function get_sign(nonce){
    var _bytedAcrawler = require("douyin_falcon:node_modules/byted-acrawler/dist/runtime");
    var signature = _bytedAcrawler.sign(nonce);
    return signature;
}