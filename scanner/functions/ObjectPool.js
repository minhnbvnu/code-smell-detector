constructor(constructorFunc, size) {
        this._constructor = constructorFunc;

        this._resize(size);
    }