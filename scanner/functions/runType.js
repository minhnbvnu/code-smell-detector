function runType() {
            var tmp = {};

            tmp.pointers = paths.map(function(path) {
                return self._getPointer();
            });
            keys.forEach(function(key) {
                tmp[key[0]] = self._runType(key[1]);
            });
            objs.push(tmp);
        }