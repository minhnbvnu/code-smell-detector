constructor() {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this.curves.push(new Curve(arguments[i]));
            }
        } else {
            if (arguments.length === 0) {
                this.curves.push(new Curve());
            } else {
                const arg = arguments[0];
                if (typeof arg === 'number') {
                    for (let i = 0; i < arg; i++) {
                        this.curves.push(new Curve());
                    }
                } else {
                    for (let i = 0; i < arg.length; i++) {
                        this.curves.push(new Curve(arg[i]));
                    }
                }
            }
        }
    }