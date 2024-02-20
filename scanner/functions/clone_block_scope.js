function clone_block_scope(deep) {
            var clone = this._clone(deep);
            if (this.block_scope) {
                clone.block_scope = this.block_scope.clone();
            }
            return clone;
        }