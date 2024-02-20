function _handleTabEvent(tab) {
        var id = (typeof tab.id === 'number') ? tab.id : tab.sessionID;

        if (!tab.active) {
            return;
        }

        if (typeof id === 'undefined') {
            return;
        }

        if (_tabIsChrome(tab)) {
            _deactivate(id);
            return;
        }

        if (_hostIsActive(_getHost(tab.url))) {
            _activate(id);
            return;
        }

        _deactivate(id);
    }