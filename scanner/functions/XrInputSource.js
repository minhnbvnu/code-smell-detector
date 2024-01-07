constructor(manager, xrInputSource) {
        super();

        this._id = ++ids;

        this._manager = manager;
        this._xrInputSource = xrInputSource;

        if (xrInputSource.hand)
            this._hand = new XrHand(this);
    }