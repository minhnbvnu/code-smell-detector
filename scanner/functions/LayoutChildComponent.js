constructor(system, entity) {
        super(system, entity);

        /** @private */
        this._minWidth = 0;
        /** @private */
        this._minHeight = 0;
        /** @private */
        this._maxWidth = null;
        /** @private */
        this._maxHeight = null;
        /** @private */
        this._fitWidthProportion = 0;
        /** @private */
        this._fitHeightProportion = 0;
        /** @private */
        this._excludeFromLayout = false;
    }