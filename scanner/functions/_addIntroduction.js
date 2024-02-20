function _addIntroduction(intro, obj){
            for (var m in intro.prototype) {
                obj.prototype[m] = intro.prototype[m];
            }
        }