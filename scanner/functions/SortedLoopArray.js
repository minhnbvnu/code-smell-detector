constructor(args) {
        this._sortBy = args.sortBy;
        this._sortHandler = this._doSort.bind(this);
    }