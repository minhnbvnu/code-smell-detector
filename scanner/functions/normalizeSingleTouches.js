function normalizeSingleTouches(ev, type) {
            var all = toArray(ev.touches);
            var changed = toArray(ev.changedTouches);
            if (type & (INPUT_END | INPUT_CANCEL)) {
                all = uniqueArray(all.concat(changed), 'identifier', true);
            }
            return [all, changed];
        }