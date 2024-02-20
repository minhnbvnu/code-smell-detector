function FontCache(jax) {
            this.cache = new Map();
            this.defs = null;
            this.localID = '';
            this.nextID = 0;
            this.jax = jax;
        }