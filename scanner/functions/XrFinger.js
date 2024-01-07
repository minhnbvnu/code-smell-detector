constructor(index, hand) {
        this._index = index;
        this._hand = hand;
        this._hand._fingers.push(this);
    }