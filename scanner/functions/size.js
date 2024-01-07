constructor(width, height) {
        if (isNumber(width) && isNumber(height)) {
            /**
             * @property {Number} width - width
             */
            this.width = width;
            /**
             * @property {Number} height - height
             */
            this.height = height;
        } else if (isNumber(width['width'])) {
            this.width = width.width;
            this.height = width.height;
        } else if (Array.isArray(width)) {
            this.width = width[0];
            this.height = width[1];
        }
    }