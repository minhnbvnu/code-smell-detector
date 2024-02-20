function _setVisible(group, state) {
            var m = group.getMembers();
            for (var i = 0; i < m.length; i++) {
                _jsPlumb[state ? CMD_SHOW : CMD_HIDE](m[i], true);
            }
        }