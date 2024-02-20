function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }