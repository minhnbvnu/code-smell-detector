function floatingDestroyer(message) {
    if (floatingWin != null) {
        if (message === "") hasFloating = false;
        try {
            floatingWin.close();
        } catch (e) {
            console.log(e);
        }
    }
}