function get_name(self) {
                    var def = self.definition();
                    return def ? def.mangled_name || def.name : self.name;
                }