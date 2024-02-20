function DrawBox(box, options) {
            if (options === void 0) { options = {}; }
            this.box = new Box(box);
            this.options = new DrawBoxOptions(options);
        }