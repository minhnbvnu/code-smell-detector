function UI() {
        this.element = document.getElementsByClassName('few-shot-container')[0];

        this._cells = [];
        this._evaluator = null;

        this._setupTrainElement();
        this.element.appendChild(createSeparator());
        this._setupTestElement();

        for (var i = 0; i < this._cells.length; ++i) {
            this._cells[i].onChange = this._cellChanged.bind(this);
        }

        this._loadDefault();
    }