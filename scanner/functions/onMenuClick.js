function onMenuClick(index) {
            return function (e) {
                const param = map._parseEvent(e, 'click');
                param['target'] = me;
                param['owner'] = me._owner;
                param['index'] = index;
                const result = this._callback(param);
                if (result === false) {
                    return;
                }
                me.hide();
                if (me._owner) {
                    me._owner.fire('closemenu');
                }
            };
        }