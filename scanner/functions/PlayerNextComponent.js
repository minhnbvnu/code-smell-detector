function PlayerNextComponent(clickHandle) {
        _classCallCheck(this, PlayerNextComponent);

        this.clickHandle = clickHandle;
        this._html = document.createElement('div');
        this._html.setAttribute('class', 'player-olympic-player-next');
        var innerDiv = document.createElement('div');
        innerDiv.setAttribute('class', 'player-olympic-player-next-tip');
        innerDiv.textContent = "Next";
        this._html.appendChild(innerDiv);
    }