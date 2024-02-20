function GroupTotals() {
        this.__groupTotals = true;
        /***
         * Parent Group.
         * @param group
         * @type {Group}
         */
        this.group = null;
        /***
         * Whether the totals have been fully initialized / calculated.
         * Will be set to false for lazy-calculated group totals.
         * @param initialized
         * @type {Boolean}
         */
        this.initialized = false;
    }