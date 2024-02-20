function listenToHoverBySelector(container, selector, onMouseEnter, onMouseLeave) {
        var currentMatchedChild;
        return listenBySelector(container, 'mouseover', selector, function (ev, matchedChild) {
            if (matchedChild !== currentMatchedChild) {
                currentMatchedChild = matchedChild;
                onMouseEnter(ev, matchedChild);
                var realOnMouseLeave_1 = function (ev) {
                    currentMatchedChild = null;
                    onMouseLeave(ev, matchedChild);
                    matchedChild.removeEventListener('mouseleave', realOnMouseLeave_1);
                };
                // listen to the next mouseleave, and then unattach
                matchedChild.addEventListener('mouseleave', realOnMouseLeave_1);
            }
        });
    }