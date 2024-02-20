function assigned_once(fn, refs) {
                        if (refs.length == 0) return fn === def.name.fixed_value();
                        return all(refs, function(ref) {
                            return fn === ref.fixed_value();
                        });
                    }