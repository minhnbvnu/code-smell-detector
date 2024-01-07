constructor(index, id, hand, finger = null) {
        this._index = index;
        this._id = id;
        this._hand = hand;
        this._finger = finger;
        this._wrist = id === 'wrist';
        this._tip = this._finger && !!tipJointIdsIndex[id];
    }