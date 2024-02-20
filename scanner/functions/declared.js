function declared() {
                switch (arguments.length) {
                case 0:
                    this.constructor.call(this);
                    break;
                case 1:
                    this.constructor.call(this, arguments[0]);
                    break;
                case 2:
                    this.constructor.call(this, arguments[0], arguments[1]);
                    break;
                case 3:
                    this.constructor.call(this, arguments[0], arguments[1], arguments[2]);
                    break;
                default:
                    this.constructor.apply(this, arguments);
                }
            }