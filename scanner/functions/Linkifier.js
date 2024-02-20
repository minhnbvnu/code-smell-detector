function Linkifier(_terminal) {
        var _this = _super.call(this) || this;
        _this._terminal = _terminal;
        _this._linkMatchers = [];
        _this._nextLinkMatcherId = HYPERTEXT_LINK_MATCHER_ID;
        _this._rowsToLinkify = {
            start: null,
            end: null
        };
        _this.registerLinkMatcher(strictUrlRegex, null, { matchIndex: 1 });
        return _this;
    }