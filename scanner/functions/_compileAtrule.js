function _compileAtrule(name) {
            var re = new RegExp('^@' + name + '\\s*([^;]+);');
            return function () {
                var pos = position();
                var m = match(re);
                if (!m)
                    return;
                var ret = { type: name };
                ret[name] = m[1].trim();
                return pos(ret);
            };
        }