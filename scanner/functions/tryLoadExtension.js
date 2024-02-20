function tryLoadExtension(name_) {
                check$1.type(name_, 'string', 'extension name must be string');
                var name = name_.toLowerCase();
                var ext;
                try {
                    ext = extensions[name] = gl.getExtension(name);
                }
                catch (e) { }
                return !!ext;
            }