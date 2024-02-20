function createNotification(title, options) {
        switch (notifications.allowed()) {
            case true:
                this.notification = new Notification(title, options);
                _.each(['click', 'close', 'error', 'show'], function (eventName) {
                    this.notification['on' + eventName] = _.bind(this.trigger, this, eventName);
                }, this);
                break;
            case null:
                notifications.requestPermission().done(_.bind(createNotification, this, title, options));
                break;
        }
    }