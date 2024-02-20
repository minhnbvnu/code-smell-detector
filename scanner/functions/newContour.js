function newContour(x, y) {
        if (open) {
            p.closePath();
        }

        p.moveTo(x, y);
        open = true;
    }