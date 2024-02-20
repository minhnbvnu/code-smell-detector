function getPermissionY(dragTd, evt) {
        try {
            var top = domUtils.getXY(dragTd).y,
                mousePosY = mouseCoords(evt).y;
            return mousePosY < top ? top : mousePosY;
        } catch (e) {
            showError(e);
        }
    }