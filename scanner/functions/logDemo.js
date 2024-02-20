function logDemo(selector) {
        (ga || function() { })("send", "event", "button", "click", "demo", selector);
    }