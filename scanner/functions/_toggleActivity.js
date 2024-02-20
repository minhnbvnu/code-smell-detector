function _toggleActivity(tab) {
        var url = tab.url;
        var host = _getHost(url);
        if (_hostIsActive(host)) {
            delete localStorage[host];
            _deactivate(tab.id);
            return;
        }
        localStorage[host] = true;
        _activate(tab.id);
    }