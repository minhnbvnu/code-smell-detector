function handleKeydownLRNav(e) {
        var cursorPosition = this.selectionStart;
        var textLength = this.value.length;
        if ((e.keyCode === Slick.keyCode.LEFT && cursorPosition > 0) ||
            e.keyCode === Slick.keyCode.RIGHT && cursorPosition < textLength - 1) {
            e.stopImmediatePropagation();
        }
    }