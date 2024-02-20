function wrapElements() {
        var topmenu = document.createElement('div');
        topmenu.setAttribute('id', 'ace_settingsmenu');
        elements.forEach(function(element) {
            topmenu.appendChild(element);
        });
        
        var el = topmenu.appendChild(document.createElement('div'));
        var version = require("../../ace").version;
        el.style.padding = "1em";
        el.textContent = "Ace version " + version;
        
        return topmenu;
    }