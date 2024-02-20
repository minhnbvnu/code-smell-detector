function assign_this_only(fn, compressor) {
            fn.new = true;
            var result = all(fn.body, function(stat) {
                return !stat.has_side_effects(compressor);
            }) && all(fn.argnames, function(argname) {
                return !argname.match_symbol(return_false);
            }) && !(fn.rest && fn.rest.match_symbol(return_false));
            delete fn.new;
            return result;
        }