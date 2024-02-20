function handleKeydownLRNoNav(e) {
        if (e.keyCode === Slick.keyCode.LEFT || e.keyCode === Slick.keyCode.RIGHT) {
            e.stopImmediatePropagation();
        }
    }