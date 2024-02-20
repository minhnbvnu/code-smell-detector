function flash(i, j) {
        setTimeout(function() {
            $pattern[0].children[i * col + j].className += ' flash';
        }, i * 10 + j * 20);
    }