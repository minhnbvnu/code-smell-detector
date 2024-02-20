function PhantomBrowser(opt) {
    if (!(this instanceof PhantomBrowser)) {
        return new PhantomBrowser(opt);
    }

    var self = this;
    self._opt = opt;
    self.status = {
        passed: 0,
        failed: 0
    };
}