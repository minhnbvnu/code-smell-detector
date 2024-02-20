function maybeBind(obj, fn) {
            return fn ? fn.bind(obj) : void 0;
        }