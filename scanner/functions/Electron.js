function Electron(opt) {
    if (!(this instanceof Electron)) {
        return new Electron(opt);
    }

    var self = this;
    self._opt = opt;
    self.status = {
        passed: 0,
        failed: 0
    };
}