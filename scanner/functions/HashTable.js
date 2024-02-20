function HashTable(size, hashFn, equalsFn) {
            this.size = size;
            this.hashFn = hashFn;
            this.equalsFn = equalsFn;
            this.itemCount = 0;
            this.table = new Array();
            for(var i = 0; i < this.size; i++) {
                this.table[i] = null;
            }
        }