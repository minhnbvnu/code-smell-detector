function MakePlural(lc) {
        var _ref = arguments[1] === undefined ? MakePlural : arguments[1];

        var cardinals = _ref.cardinals;
        var ordinals = _ref.ordinals;

        _classCallCheck(this, MakePlural);

        if (!cardinals && !ordinals) throw new Error('At least one type of plural is required');
        this.lc = lc;
        this.categories = { cardinal: [], ordinal: [] };
        this.parser = new Parser();
        
        this.fn = this.buildFunction(cardinals, ordinals);
        this.fn._obj = this;
        this.fn.categories = this.categories;
        
        this.fn.toString = this.fnToString.bind(this);
        return this.fn;
    }