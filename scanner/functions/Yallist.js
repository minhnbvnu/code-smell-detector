function Yallist(list) {
        var self = this;
        if (!(self instanceof Yallist)) {
            self = new Yallist();
        }
        self.tail = null;
        self.head = null;
        self.length = 0;
        if (list && typeof list.forEach === 'function') {
            list.forEach(function (item) {
                self.push(item);
            });
        }
        else if (arguments.length > 0) {
            for (var i = 0, l = arguments.length; i < l; i++) {
                self.push(arguments[i]);
            }
        }
        return self;
    }