function Recognizer(options) {
            this.options = assign({}, this.defaults, options || {});
            this.id = uniqueId();
            this.manager = null;
            // default is enable true
            this.options.enable = ifUndefined(this.options.enable, true);
            this.state = STATE_POSSIBLE;
            this.simultaneous = {};
            this.requireFail = [];
        }