function get_type(variable) {
            return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
        }