function scopeProfile(value) {
                    var prev = scope.def(CURRENT_STATE, '.profile');
                    scope(CURRENT_STATE, '.profile=', value, ';');
                    scope.exit(CURRENT_STATE, '.profile=', prev, ';');
                }