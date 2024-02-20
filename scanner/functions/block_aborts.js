function block_aborts() {
                for (var i = 0; i < this.body.length; i++) {
                    if (aborts(this.body[i])) {
                        return this.body[i];
                    }
                }
                return null;
            }