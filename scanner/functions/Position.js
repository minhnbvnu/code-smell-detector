constructor(x, y, z) {
        if (!isNil(x) && !isNil(y)) {
            /**
             * @property x {Number} - x value
             */
            this.x = +(x);
            /**
             * @property y {Number} - y value
             */
            this.y = +(y);
            /**
             * @property z {Number} - z value, it's a pure property and doesn't take part in caculation for now.
             */
            this.z = z;
        } else if (!isNil(x.x) && !isNil(x.y)) {
            this.x = +(x.x);
            this.y = +(x.y);
            this.z = x.z;
        } else if (Array.isArray(x)) {
            this.x = +(x[0]);
            this.y = +(x[1]);
            this.z = x[2];
        }
        if (this._isNaN()) {
            throw new Error('Position is NaN');
        }
    }