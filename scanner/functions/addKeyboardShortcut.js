function addKeyboardShortcut(key, fn) {
    Mousetrap.unbind(key);
    Mousetrap.bind(key, function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            // internet explorer
            e.returnValue = false;
        }
        fn();
        return false;
    });
    
}