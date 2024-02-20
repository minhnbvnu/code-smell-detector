function _handleIconClick(tab) {
        if (_tabIsChrome(tab)) {
            return alert('You cannot use Chrome Logger on this page.');
        }
        _toggleActivity(tab);
    }