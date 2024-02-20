function _escape(data) {
        if (typeof data === 'string') {
            return data.replace(/[&<>"'\/]/g, function (s) {
                return _entityMap[s];
            });
        }else{
            return data;
        }
    }