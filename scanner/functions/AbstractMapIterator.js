function AbstractMapIterator(map)
    {
        this._associatedMap = map;
        this._expectedModCount = map._modCount;
        this._futureEntry = null;
        this._currentEntry = null;
        this._prevEntry = null;
        this._position = 0;
    }