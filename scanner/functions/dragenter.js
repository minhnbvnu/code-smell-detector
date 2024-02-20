function dragenter(e) {
            e.stopPropagation();
            e.preventDefault();
            if (dragClass) {
                addClass(dropbox, dragClass);
            }
        }