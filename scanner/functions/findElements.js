function findElements(container, selector) {
        var containers = container instanceof HTMLElement ? [container] : container;
        var allMatches = [];
        for (var i = 0; i < containers.length; i++) {
            var matches = containers[i].querySelectorAll(selector);
            for (var j = 0; j < matches.length; j++) {
                allMatches.push(matches[j]);
            }
        }
        return allMatches;
    }