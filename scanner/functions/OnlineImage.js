function OnlineImage(target) {
        this.container = utils.isString(target) ? document.getElementById(target) : target;
        this.init();
    }